import { check } from "express-validator";

const courseValidator = () => {
    const year = new Date().getFullYear();
    return [
        check("albumTitle")
            .isLength({min : 2})
            .withMessage("Album title must be at least 2 characters in length"),
        check("band")
            .isLength({min : 2})
            .withMessage("Band name must be at least 2 characters in length"),
        check("albumYear")
            .isNumeric()
            .withMessage("Album year must be a number")
            .custom(value=>{
                
                return value >= 1900 && value <= year
            })
            .withMessage(`album year must be between 1900 and ${year}`)
    ]
}
export default courseValidator;
