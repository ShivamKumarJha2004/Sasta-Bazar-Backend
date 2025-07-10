import User from "../models/userModel.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config();

const generateTokens=(user)=>{
const token=jwt.sign({
    userId:user?._id},
    process.env.JWT_SECRET,
    {expiresIn:"2d"}
);

const refreshToken=jwt.sign(
    {userId:user?._Id},
    process.env.ACCESS_TOKEN,
    {expiresIn:"7d"}
)
return {token,refreshToken}
}

export const userSignup = async (req, res) => {
    const { name, phone, address } = req.body || {};
    console.log('req.body:', req.body);
    console.log('name:', name, 'phone:', phone, 'address:', address);
    if (!name || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const userExist= await User.findOne({ phone})
        if(userExist)
        {
            return res.status(409).json({
                success:false,
                message:"User already exists"
            })
        }
        const user = new User({ name, phone, address });
        await user.save();
        const {token,refreshToken}=generateTokens(user.toObject)
        res.status(200).json({
            success:true,
            user,
            token,
            refreshToken
        })

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export const login=async(req,res)=>{
    const { phone } = req.body;
    if ( !phone ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
}
export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
