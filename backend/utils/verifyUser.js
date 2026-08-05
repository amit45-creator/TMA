// import { errorHandler } from "./error.js";
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//     console.log("Cookies:", req.cookies);
//     console.log("Header:", req.headers.cookie);

//     const token = req.cookies.access_token;

//     if (!token) {
//         return next(errorHandler(401, "Unauthorised"));
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return next(errorHandler(401, "Unauthorised"));
//         }

//         req.user = user;
//         next();
//     });
// };

// export const adminOnly = (req, res, next) => {
//       const token = req.cookies.access_token;

//     if (!token) {
//         return next(errorHandler(401, "Unauthorised"));
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return next(errorHandler(401, "Unauthorised"));
//         }

//         req.user = user;
//         console.log(req.user)
//        if (req.user && req.user.role === "admin") {
//         next();
//     } else {
//         return next(errorHandler(403, "Access Denied, admin only!"));
//     }
//     });
   
// };



console.log("VERIFY USER FILE LOADED");
import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";   // 👈 Added

export const verifyToken = (req, res, next) => {
     console.log("VERIFY TOKEN CALLED");   // 👈 ADD

    console.log("Cookies:", req.cookies);
    console.log("Header:", req.headers.cookie);

    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Unauthorised"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, "Unauthorised"));
        }

        req.user = user;
        next();
    });
};

export const adminOnly = (req, res, next) => {

     console.log("ADMIN ONLY CALLED");
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Unauthorised"));
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {   // 👈 async Added
        if (err) {
            return next(errorHandler(401, "Unauthorised"));
        }

        req.user = user;
        console.log(req.user);

        // 👇 Added: Fetch latest user from database
        const currentUser = await User.findById(req.user.id);

        if (currentUser && currentUser.role === "admin") {
            next();
        } else {
            return next(errorHandler(403, "Access Denied, admin only!"));
        }
    });
};





