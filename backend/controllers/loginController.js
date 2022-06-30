import User from "../models/user.js"
import createError from "http-errors";

export const loginPost = async (req, res, next) => {
    // Take the username and password the user tried to log in with
    const { username, password } = req.body;
    // Search inside the "users" collection of album project db: same userN / password?
    let found;
    try {
        found = await User.findOne({
            username: username,
            password: password
        })
    } catch {
        return next(createError(500, "could not query database. Please try again"));
    }
    // same login details as we received from the FE -> Send id back to FE in the response 
    if (found) {
        const userId = {
            id: found.id
        };
        res.json(userId);
        // no user // Create an error object + pass it to the error handling middleware
    } else {
        return next(createError(401, "You could not be logged in. Please try again"));
    }
}