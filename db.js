const momgoose=require("mongoose")
require("dotenv").config();
// const mongoURL="mongodb://localhost:27017/data"
// const mongoURL= process.env.DB_URL_LOCAL

const mongoURL= process.env.DB_URL;

momgoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=momgoose.connection

db.on('connected',()=>{
    console.log('mongoDB server connected')
})

db.on('error',()=>{
    console.log('mongoDB server connection Error')
})

db.on('disconnected',()=>{
    console.log('mongoDB server disconnected')
})

module.exports={db};