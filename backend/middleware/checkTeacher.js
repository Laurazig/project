//        const decodedToken = jwt.verify(token, process.envESCRET_KEY);

import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const teacher = async (req,res,next) =>{
    let token;
    try {
        //token = req.headers.authorization.split(" ")[1]; 
        token= req.cookies.dataCookie;
        if(!token){      
            throw new Error("user unauthorised")
        }
        const decodedToken = jwt.verify(token, process.envESCRET_KEY);
        let currentUser;
        try {
            currentUser = await User.findById(decodedToken.id)
        } catch {
            return next(createError(500, "couldn't query database"))
        }
        if (currentUser && currentUser.teacher){
            next();
        } else  {
            next(createError(403, "User could not be authorised"))
        }
        //console.log("decoded token", decodedToken);
    } catch{   
        next(createError(403,"user could not be authorised"))
    }
}
export default teacher
