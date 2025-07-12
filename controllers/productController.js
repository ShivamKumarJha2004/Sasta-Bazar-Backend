import Product from "../models/product.js"

const getProductByCategoryID = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const product = await Product.findById(categoryId);
        if(!product || product.length==0)
        {
          return res.status(404).json({
            success:false,
            message:"Product not found for this category ",

          })
        }
        res.status(200).json({
            success:true,
            message:"Product get successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get products",
            error: error.message
        });
    }
};
export default getProductByCategoryID