import createError from "http-errors";
import { validationResult } from "express-validator";

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);    

    // If we find at least one error...
    if (!errors.isEmpty()) {
        const foundErrors = errors.array();
        let errorString = "";

        // Build up message to send back to frontend
        foundErrors.forEach((err, index) => {
            // If the error object we are looking at is NOT the final one in the array...
            index !== foundErrors.length - 1
                ? errorString += err.msg + "\n"
                : errorString += err.msg
        })

        // Send error response to frontend via error handling middleware
        return next(createError(401, errorString));
    }

    next();
}

export default checkValidation;