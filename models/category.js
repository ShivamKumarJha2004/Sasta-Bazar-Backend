import mongoose, { Schema } from "mongoose"

const categorySchema = new Schema({
    name: { type: String, required: true },
    image_uri: { type: String ,required:true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

})
const Category = mongoose.model("category", categorySchema)
export default Category;