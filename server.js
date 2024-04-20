const express = require("express");
const app = express();

const path=require("path");
const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 3000
app.use(express.urlencoded({extended:false}))
const static_method= path.join(__dirname ,'./public')

app.use(express.static(static_method))

const userRoute=require('./userRoute');
app.use("/user",userRoute);


app.listen(PORT,()=>{
    console.log("listening to port 3000")
})


