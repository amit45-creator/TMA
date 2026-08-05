import express from "express"
import {adminOnly,verifyToken}  from "../utils/verifyUser.js"
import {getUsers} from "../controller/user.controller.js"

const router = express.Router()

console.log("USER ROUTE LOADED");   // 👈 Add this
//user management route 

// router.get("/get-users",verifyToken,adminOnly,getUsers)//abhi ke liey comment rahega 
router.get("/get-users", (req, res, next) => {
    console.log("GET USERS ROUTE HIT");   // 👈 Add this
    next();
}, verifyToken, adminOnly, getUsers);

export default router 