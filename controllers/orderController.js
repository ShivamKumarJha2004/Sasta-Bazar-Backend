import Razorpay from "razorpay"
import crypto from "crypto"
import Order from "../models/order.js"
import Transaction from "../models/transaction.js"
const createTransaction = async (req, res) => {
    const { amount, userId } = req.body

    const razorpay = new Razorpay({
        key_id: process.env.Razor_Pay_Key_ID,
        key_secret: process.env.Razor_Pay_Key_Secret
    })
    const options = {
        amount: amount,
        currency: "INR",
        reciept: `reciept#${Date.now()}`
    }

    try {
        if (!amount || !userId) {
            return res.status(400).json({
                success: false,
                message: "Amount and UserId Required !!"
            })
        }
        const razorpayOrder = await razorpay.orders.create(options)
        res.status(201).json({
            success: false,
            message: "Order created SuccessFully ",
            key: process.env.Razor_Pay_Key_ID,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order_id: razorpayOrder.id



        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Create Order !!",
            error: error.message
        })

    }
}

const createOrder = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        cartItems,
        deliveryDate,
        address,

    } = req.body

    const key_secret = process.env.Razor_Pay_Key_Secret;
    const generated_signature = crypto.createHmac('sha256', key_secret).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex')

    if (generated_signature === razorpay_signature) {
        try {
            const transaction = await Transaction.create({
                user: userId,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status: "Success",
                amount: cartItems.reduce(
                    (total, item) => (
                        total + item?.quantity * item.price, 0
                    )
                )
            })
            const order = await Order.create({
                user: userId,
                address,
                deliveryDate,
                items: cartItems?.map((item) => ({
                    product: item?._id,
                    quantity: item?.quantity
                })),
                status: "Order Placed"
            })
            transaction.order = order._id
            await transaction.save()
            res.status.json({
                success: true,
                message: "Payement Varified & Order Created !!",
                order
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to Create Order !!",
                error: error.message
            })
        }
    }
}
    const getOrderByUserId = async (req, res) => {
        const { userId } = req.params
        try {
            const order = await Order.find({
                user: userId,

            }).populate('user', 'name email').populate("items.product", "name price image_url, ar_url").sort({ created: -1 })

            if (!order || order.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No order found for this user"
                })
            }
            res.status(200).json({
                success: true,
                order
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get Order !!",
                error: error.message
            })
        }
    }


export { createTransaction, createOrder,getOrderByUserId}