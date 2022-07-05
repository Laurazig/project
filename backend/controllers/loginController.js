//bcrypt.compare,  jwt.sign  &  res.cookie

import User from "../models/user.js"
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginPost = async (req, res, next) => {
    // Take the username and password the user tried to log in with
    const { username, password } = req.body;
    // Search inside the "users" collection of courses project db: same userN / password?
    let found;
    try {
        found = await User.findOne({ username: username })
    } catch {
        return next(createError(500, "could not query database. loginController.js"));
    }
    // If we found a user in our db with the same login details as we received from the frontend...
    // Send that user's id back the frontend in the response for further processing
    if (found) {
        let isValidPassword;
        try {
            isValidPassword = await bcrypt.compare(password, found.password)
        } catch {
            return next(createError(500, "logging in failed. loginController.js"))
        }
        if (!isValidPassword) {
            return next(createError(401, "incorrect password. loginController.js"))
        }
        //---------------------------
        //create& issue JWT
        let newToken;
        try {
            newToken = jwt.sign({ id: found.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.cookie("dataCookie", newToken, { httpOnly: true, sameSite: "Strict" })
        } catch {
            return next(createError(500, "login not completed. loginController.js"))
        }
        // console.log("Token", token) 
        //---------------------------
        res.json({ id: found._id, token: newToken });
    } else {
        return next(createError(401, "no user exists with this username. loginController.js"));
    }
}