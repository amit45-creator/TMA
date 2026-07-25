import express from "express"
import {signin,signup,userProfile} from "../controller/auth.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post("/sign-up",signup)

router.post("/sign-in",signin)

router.get("/user-profile", verifyToken,userProfile)

//dummy test
console.log("Auth Route Loaded");

router.get("/hello", (req, res) => {
    res.send("Hello Auth");
});

export default router