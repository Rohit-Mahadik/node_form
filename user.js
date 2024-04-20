const mongoose=require("mongoose");
// const { type } = require("os");
const { type } = require("os")

const bcrypt=require("bcrypt")
// const { throws } = require("assert")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save', async function(next){
    const person=this

    if(!person.isModified('password')) return next();

    try{
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash( person.password, salt)
        person.password=hashedPassword
        next()
    }
    catch(err){
       return next(err)
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }
    catch(err){
        throw err
    }
}

const user=mongoose.model("user",userSchema)
module.exports=user;







