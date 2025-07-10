import mongoose, { Schema } from "mongoose"

const categorySchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

})
const Category = mongoose.model("category", userSchema)
export default Category;