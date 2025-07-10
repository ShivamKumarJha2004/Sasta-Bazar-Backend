import Category from "../models/category.js"

const getAllCategory=async(req,res)=>{
    try {
        const category=await Category.find()
        res.status(200).json({
            success:true,
            message:"Category Fetch Sucessfully",
            category
        })
        
        
    } catch (error) {
        res.staus(500).json({
            success:false,
            message:"Failed to get categories",
            error:error.message
        })
    }
}
export default getAllCategory