import mongoose, { Schema } from "mongoose"

const userSchema=new Schema({
   name:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    address:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}

})
const User=mongoose.model("user",userSchema)
export default User;