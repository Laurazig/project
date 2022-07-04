import { check } from "express-validator";

// second version- EXPRESS VALIDATOR
const requiredValues = (props) => {
    let checks = [];
    props.forEach(field =>{
        checks.push(
            check(field)
            .notEmpty()
            .withMessage(`${field} is required`),
        )
    })
    return checks;
}



// #region  first version 
// const requiredValues = (props) => {    
//    return (req,res,next) =>{
//         props.forEach(field => {
//             if (!req.body[field]) return next(createError(401, `${field}is required`))
//         });
//    }
// }
// #endregion  first version 

//
export default requiredValues;

