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

export const signup = async (req, res) => {

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
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check if user already exists
    const isAlreadyExist = await User.findOne({ email });

    if (isAlreadyExist) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
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

        // Send success response
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });

    } catch (error) {
        // Handle server/database errors
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
