import mongoose, { Schema } from "mongoose"
const itemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

})

const orderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    deliveryDate:{
        type:Date,
        required:true,

    },
    deliveryDate:{
       type:String 
    },
    items:{
        type:[itemSchema],
        required:true
    },
    status:{
        type:String,
        enum:[
            "Order Placed",
            "Shipping",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
        ],
        default:"Orded Placed",
        required:true
    },
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})
const Order = mongoose.model("order", orderSchema)
export default Order;