const express=require("express")
const router=express.Router()
const userSchema=require("./user")
const bcrypt=require("bcrypt")


router.post("/register", async (req, res) => {
   try {

    const password=req.body.password
    const confirm_password=req.body.confirm_password

    if(password===confirm_password){
         const registerUser = new userSchema({
               name: req.body.name,
               age: req.body.age,
               email: req.body.email, 
               mobile: req.body.mobile, 
               password:req.body.password
           });

           const registered = await registerUser.save();
        //    res.status(200).send({Message: "Registration successfully"})
        //res.render('index',{success: "Registered successfully"})
            res.write(
            '<script>window.location.href="http://localhost:3000/";window.alert("Registration successfully");</script>'
            );
        //    res.redirect("/")
        }else{
            res.write('<script>window.location.href="http://localhost:3000/";window.alert("Error: Password and confirm password don\'t match ");</script>')
        }
   } catch (error) {
       console.log(error);
       res.status(400).json(error);
   }
});

router.post("/signIn",async (req,res)=>{
    //extract username and password from request body

    // const {username,password}=req.body
    const email=req.body.email
    const password=req.body.password

    //find the user by username
    const user=await userSchema.findOne({email: email})

    //if user doesn't exist or password doesn't match throw error;

    if(!user || !(await user.comparePassword(password))){
        res.write('<script>window.location.href="http://localhost:3000/signIn.html";window.alert("Error: Invalid Username Or Password");</script>')
    }else{
        res.write('<script>window.location.href="https://media.tenor.com/wDmy7nNY6ZcAAAAM/god-coding.gif";</script>')
    }

    // const payload={
    //     id:user.id,
    //     username:user.username,
    //     email:user.email
    // }

    // const tokan=generate_token(payload)
    
})


router.post("/update",async (req,res)=>{
    try{
        var personEmail_id={email: req.body.email};

        var password= req.body.password
        var confirmPassword= req.body.Confirm_password


        if(password===confirmPassword){
            var salt= await bcrypt.genSalt(10)
            var hashedPassword= await bcrypt.hash( confirmPassword,salt)
            var updatedPassword={password: hashedPassword};

            var response=await userSchema.findOneAndUpdate(personEmail_id, updatedPassword,{
                new:true,
                runValidators:true
            })
        }
        if(!response){
            res.write('<script>window.location.href="http://localhost:3000/forgetPasword.html";window.alert("Error: Person Not Found");</script>')
        }else{
            res.write('<script>window.location.href="http://localhost:3000/signIn.html";window.alert("Success: Password Updated Successfully");</script>')
        }  
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"internal server error"})
    }
})

module.exports=router;