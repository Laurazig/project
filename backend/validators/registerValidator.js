import { check } from "express-validator";
const registerValidator = () => {
    return [
        check("username")
            .trim()
            .escape().isLength({min : 6, max : 50})
            .withMessage("Username must be between 6 & 15 characters in length")
            .custom(value =>{
                return value.toLowerCase().indexOf("jamie") === -1;
            })
            .withMessage("no Jamies allowed"),
        check("password")
            .escape().isStrongPassword()
            .withMessage("password must be 8 characters in length, 1 upper and lower character,1 symbol"),
        check("emailAddress")
            .normalizeEmail()
            .isEmail()
            .withMessage("email must be in a valid format")
    ]
}
export default registerValidator;
