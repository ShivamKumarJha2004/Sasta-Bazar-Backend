import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express"
import session from "express-session"
import ConnectMongoDBSession from "connect-mongodb-session";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";
import User from "../models/userModel.js";
import Transaction from "../models/transaction.js";
import * as AdminJsMongoose from "@adminjs/mongoose"
import { Cookies_Password } from "./config.js";
import { dark,light,noSidebar } from "@adminjs/themes";

AdminJs.registerAdapter(AdminJsMongoose)

const DEFAULT_ADMIN={
    email:"shivam@gmail.com",
    password:"12345678"
}

const authenticate=async(email,password)=>{
    console.log('🔐 AUTHENTICATE FUNCTION CALLED!');
    console.log('🔐 Login attempt:', email, password);
    if(email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password)
    {
        console.log('✅ Authentication successful');
        return Promise.resolve(DEFAULT_ADMIN)
    }
    console.log('❌ Authentication failed');
    return null
}

export const buildAdminJS=async (app)=>{
    console.log('🚀 Starting AdminJS setup...');
    console.log('📡 MONGO_URI:', process.env.MONGO_URI);
    
    if (!process.env.MONGO_URI) {
        throw new Error('❌ MONGO_URI is not set in environment variables!');
    }

    const admin=new AdminJs({
        resources:[
        {resource:Product, options: {navigation: {name: 'Products'}}},
        {resource:Category, options: {navigation: {name: 'Categories'}}},
        {resource:Order, options: {navigation: {name: 'Orders'}}},
        {resource:User, options: {navigation: {name: 'Users'}}},
        {resource:Transaction, options: {navigation: {name: 'Transactions'}}},
        ],
        branding:{
            companyName:"Sasta-Bazar",
            withMadeWithLove:false,
            favicon:"https://www.google.com/favicon.ico",
            logo:"https://www.google.com/favicon.ico",
        },
        defaultTheme:dark.id,
        availableThemes:[dark,light,noSidebar],
        rootPath:"/admin"
    })

    console.log('📦 Creating MongoDB session store...');
    
    const MongoDBStore = ConnectMongoDBSession(session);
    
    const sessionStore = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: "sessions",
        connectionOptions: {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        }
    });

    // Add error handling for session store
    sessionStore.on('error', function(error) {
        console.error('❌ Session store error:', error);
    });

    sessionStore.on('connected', function() {
        console.log('✅ Session store connected successfully');
    });

    console.log('🔧 Building AdminJS router...');

    // Test the authenticate function
    console.log('🧪 Testing authenticate function...');
    const testResult = await authenticate('shivam@gmail.com', '12345678');
    console.log('🧪 Test result:', testResult);

    // Create authentication options
    const authOptions = {
        authenticate: authenticate,
        cookieName: "adminjs",
        cookiePassword: Cookies_Password
    };

    console.log('🔐 Auth options:', authOptions);

    const adminRouter = AdminJsExpress.buildAuthenticatedRouter(
        admin, 
        authOptions,
        null,
        {
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            secret: Cookies_Password,
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            },
            name: "adminjs"
        }
    );

    try {
        // Set up session middleware BEFORE custom authentication
        app.use(session({
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            secret: Cookies_Password,
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            },
            name: "adminjs"
        }));

        // Add custom middleware BEFORE mounting the AdminJS router
        app.use('/admin', (req, res, next) => {
            console.log('📨 AdminJS request:', req.method, req.originalUrl, req.body);
            
            // If this is a login request, handle it manually
            if (req.method === 'POST' && req.originalUrl.includes('/login')) {
                console.log('🔐 Intercepting login request...');
                const { email, password } = req.body;
                
                authenticate(email, password).then(user => {
                    if (user) {
                        console.log('✅ Manual authentication successful');
                        // Set session data
                        req.session.adminUser = user;
                        req.session.authenticated = true;
                        req.session.save((err) => {
                            if (err) {
                                console.error('❌ Session save error:', err);
                                res.redirect('/admin/login?error=session');
                            } else {
                                console.log('✅ Session saved successfully');
                                res.redirect('/admin');
                            }
                        });
                    } else {
                        console.log('❌ Manual authentication failed');
                        res.redirect('/admin/login?error=invalid');
                    }
                }).catch(err => {
                    console.error('❌ Manual authentication error:', err);
                    res.redirect('/admin/login?error=server');
                });
            } else {
                next();
            }
        });

        app.use(admin.options.rootPath, adminRouter);
        console.log('✅ AdminJS router mounted at', admin.options.rootPath);
    } catch (error) {
        console.error('❌ Error mounting AdminJS router:', error);
        throw error;
    }
    
    console.log('🎉 AdminJS setup completed!');
}

