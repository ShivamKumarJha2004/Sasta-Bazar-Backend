import mongoose, { Schema } from "mongoose"

const transactionSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    },
    paymentId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Sucess","Failed","Pending"],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

})
const Transaction = mongoose.model("product", userSchema)
export default Product;