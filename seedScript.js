import dotenv from "dotenv"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Category from "./models/category.js"
import { categoriesData, productData } from "./seedData.js"

dotenv.config()

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        await Product.deleteMany({})
        await Category.deleteMany({})

        const categoryDocs = await Category.insertMany(categoriesData)
        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id
            return map
        }, {})
        const productwithCategoryId = productData.map((item) => ({
            ...item, category: categoryMap[item.category],
        }))
        await Product.insertMany(productwithCategoryId)
        console.log("Database Connected SuccessFully !!");

    } catch (error) {
        console.log("Error in seeding", error);

    }
    finally {
        mongoose.connection.close();
    }
}

seedDatabase();