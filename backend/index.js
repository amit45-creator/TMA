// import express from "express"
// import cors  from "cors"
// import dotenv from "dotenv"
// import mongoose from "mongoose"
// import authRoutes from "./routes/auth.route.js"
// console.log("Index file loaded")
// dotenv.config()

// mongoose.connect(process.env.MONGO_URI).then(() =>{
//     console.log("database is connected")
// }).catch((err)=>{
//     console.log(err)
// })

// const app = express()

// //Middleware to handle cors 
// app.use(
//     cors({
//         origin: process.env.FRONT_END_URL || "http://localhost:5173",
//         methods: ["GET","POST","PUT","DELETE"],
//         allowedHeaders: ["Content-Type","Authorization"],
//     }))


//     // middleware to handle json object in req body 
//     app.use(express.json())
// app.listen(3000,()=>{
//     console.log("server is running on port 3000!")
// })


// app.use((req,res,next)=>{
//     console.log("method:",req.method);
//     console.log("url:",req.url);
//     next();
// })
//  app.use("/api/auth",authRoutes)








import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";


console.log("Index file loaded");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("database is connected");
})
.catch((err) => {
    console.log(err);
});

const app = express();

// Middleware to handle cors
app.use(
    cors({
        origin: process.env.FRONT_END_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middleware to handle json object in req body
app.use(express.json());
app.use(cookieParser())

app.listen(3000, () => {
    console.log("server is running on port 3000!");
});

// Request Logger Middleware
app.use((req, res, next) => {
    console.log("METHOD:", req.method);
    console.log("URL:", req.url);
    next();
});


// ======================
// TEST ROUTE (TEMPORARY)
// ======================
app.post("/test", (req, res) => {
    console.log("TEST BODY =", req.body);
    res.json(req.body);
});


// Auth Routes
app.use("/api/auth", authRoutes);

app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500 
    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message,

    })

})