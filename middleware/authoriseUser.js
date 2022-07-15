//req.cookies.dataCookie  & jwt.verify

import jwt from "jsonwebtoken";
import createError from "http-errors"

const authoriseUser = (req,res,next) =>{
    console.log("**********authoriseUser middleware***********************")
    let token;
    try {
        console.log(`COOKIE in array -authoriseUser.js: ${req.cookies}`)
        console.log(req.cookies)
        console.log("COOKIE ****authoriseUser:****req.cookies.dataCookie**********", req.cookies.dataCookie);
        //token = req.headers.authorisation.split(" ")[1]; 
        token = req.cookies.dataCookie        
        if(!token){      
            throw new Error("user unauthorised - no token. MIDDLEWARE: authoriseUser.js")
        }
        const decodedToken = jwt.verify(token, "myserverssecretkey");//token exists
        console.log("decoded TOKEN ******authoriseUser: ********jwt.verify ************", decodedToken);
        next() //valid
    } catch (err){   //varify
        next(createError(403,"user could not be authorised. MIDDLEWARE: authoriseUser.js"))
    }
}
export default authoriseUser