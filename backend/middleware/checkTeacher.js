//        const decodedToken = jwt.verify(token, process.envESCRET_KEY);

import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const teacher = async (req,res,next) =>{
    console.log("**********teacher  (check admin) middleware***********************")
    let token;
    try {
        //token = req.headers.authorization.split(" ")[1]; 
        token= req.cookies.dataCookie;
        if(!token){      
            throw new Error("user unauthorised. MIDDLEWARE: checkTeacher.js")
        }
        const decodedToken = jwt.verify(token, process.envESCRET_KEY);
        let currentUser;
        try {
            currentUser = await User.findById(decodedToken.id)
        } catch {
            return next(createError(500, "couldn't query database.  MIDDLEWARE: checkTeacher.js"))
        }
        if (currentUser && currentUser.teacher){ //admin?
            next();
        } else  {
            next(createError(403, "User could not be authorised. MIDDLEWARE: checkTeacher.js"))
        }
        //console.log("decoded token", decodedToken);
    } catch{   
        next(createError(403,"user could not be authorised. FE>BUTTON(usersData.js-GET) -> BE> MIDDLEWARE: checkTeacher.js"))
    }
}
export default teacher
