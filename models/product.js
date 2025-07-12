import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    name: { type: String, required: true },
    image_uri: { type: String ,required:true},
    description: { type: String },
    price:{type:Number,required:true},
    ar_url:{type:String},
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

})
const Product = mongoose.model("product", productSchema)
export default Product;