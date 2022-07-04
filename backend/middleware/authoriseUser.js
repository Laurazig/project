//req.cookies.dataCookie  & jwt.verify

import jwt from "jsonwebtoken";
import createError from "http-errors"

const authoriseUser = (req,res,next) =>{
    let token;
    try {
        console.log("cookie", req.cookies.dataCookies);
        //token = req.headers.authorisation.split(" ")[1]; 
        token = req.cookies.dataCookie        
        if(!token){      
            throw new Error("user unauthorised")
        }
        const decodedToken = jwt.verify(token, "myserversecretkey");//token exists
        console.log("decoded token", decodedToken);
        next() //valid
    } catch (err){   //varify
        next(createError(403,"user could not be authorised"))
    }
}
export default authoriseUser