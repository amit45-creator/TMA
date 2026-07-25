// import User from "../models/user.model.js"
// import  bcryptjs from "bcryptjs"
// export const signup = async(req,res) =>{
//      console.log("Signup controller called");
//     console.log("BODY =",req.body);//during debugging I add this line 
//   const {
//     name,email,password,profileImageUrl,adminJoinCode } = req.body;

//     if(!name || !email || !password || name==="" || password===""){
//         return res.status(400).json({message: "All fields are required"})
//     }

//     //check if user already exists
//     const isAlreadyExist= await User.findOne({email})

//     if(isAlreadyExist){
//         return res
//         .status(400)
//         .json({
//             success:false,message:"User already exists"
//         })
//     }
//     //check user role 
//     let role ="user"

//     if(adminJoinCode&& adminJoinCode===process.env.ADMIN_JOIN_CODE){
//         role ="admin"
//     }

//     const hashedPassword =bcryptjs.hashSync(password,10)

//     const newUser = new User(
//         {
//             name,
//             email,
//             password:hashedPassword,
//             profileImageUrl,
//             role,
//         }
//     )
//     try {
//         await newUser.save()
//     } catch (error){
//         res.status(500).json({message: error.message});
//     }
// }





import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async (req, res,next) => {

    // Extract data from request body
    const {
        name,
        email,
        password,
        profileImageUrl,
        adminJoinCode
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || name === "" || password === "") {
        return next(errorHandler(400,"All fields are required"))
    }

    // Check if user already exists
    const isAlreadyExist = await User.findOne({ email });

    if (isAlreadyExist) {
       return next(errorHandler(400,"user already exists"))
    }

    // Assign user role
    let role = "user";

    if (adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE) {
        role = "admin";
    }

    // Hash the password before saving
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user object
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        role,
    });

    try {
        // Save user into MongoDB
        await newUser.save();

        res.json("Signup successful")

    } catch (error) {
        next(error.message)
    }
};

export const signin = async(req,res,next)=>{
    try{
        const { email,password}=req.body
        if(!email || !password || email==="" || password===""){
            return next(errorHandler(400,"All fields are required"))
        }
        const validUser = await User.findOne({email})

        if(!validUser){
            return next(errorHandler(404,"User Not found"))
        }

        //compare password 
        const validPassword =bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(400,"Wrong Credentials"))
        }

        const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)

        const {password: pass,...rest}=validUser._doc

        res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest)
    } catch(error){
        next(error)
    }
}

export const userProfile =async(req,res,next) =>{
    try{
        const user = await User.findById(req.user.id)

        if(!user) {
            return next(errorHandler(404,"user not found!"))
        }
        const { password: pass,...rest}=user._doc

        res.status(200).json(rest)
    } catch(error){
        next(error)
    }
}

