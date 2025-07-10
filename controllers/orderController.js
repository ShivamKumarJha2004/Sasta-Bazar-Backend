import Razorpay from "razorpay"
import crypto from "crypto"
import Order from "../models/order"
const createTransaction=async(req,res)=>{
const {amount , userId}=req.body

const razorpay=new Razorpay({
    key_id:process.env.Razor_Pay_Key_ID ,
    key_secret:process.env.Razor_Pay_Key_Secret
})
const options={
    amount:amount,
    currency:"INR",
    reciept:`reciept#${Date.now()}`
}

try 
{
    if(!amount || !userId)
    {
        return res.status(400).json({
            success: false,
            message: "Amount and UserId Required !!"  
        })
    }
    const razorpayOrder=await razorpay.orders.create(options)
    res.status(201).json({
        success:false,
        message:"Order created SuccessFully ",
        key:process.env.Razor_Pay_Key_ID


    })
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to Create Order !!",
        error: error.message
    })

}
}