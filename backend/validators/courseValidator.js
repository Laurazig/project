// change year check to date check drop down?

import { check } from "express-validator";

const courseValidator = () => {
    const year = new Date().getFullYear();
    return [
        check("courseTitle")
            .isLength({min : 2})
            .withMessage("Course title must be at least 2 characters in length"),
        check("school")
            .isLength({min : 2})
            .withMessage("School name must be at least 2 characters in length"),
        // check("courseDate")
        //     .isNumeric()
        //     .withMessage("Clurse year must be a number")
        //     .custom(value=>{
                
        //         return value >= 1900 && value <= year
        //     })
        //     .withMessage(`album year must be between 1900 and ${year}`)
    ]
}
export default courseValidator;
