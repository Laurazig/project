import User from "../models/user.js";
//import { v4 as uuid } from "uuid";
import createError from "http-errors";

export const registerPost = async (req, res) => {
    const { username, password, firstName, lastName, emailAddress } = req.body;
    let found;
    try {
        found = await User.findOne({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            courses: []
        })
    } catch{
        return next(createError(500, "could not query database"))
    }
     // If there is no user in the db with the username received from the frontend
     if (!found) {
        // Create a new user based on data received from req.body
        const newUser = new User({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            courses: []
        })
       try {
        await newUser.save();
       } catch {
        return next(createError(500, "couldn't create user, please try again."));
       } 
        // Send a response to the client containing the new user object in a JSON format
        res.status(201).json(newUser._id);
    // if user in the db with the username received from the frontend
    // Create an error object and pass it to the error handling middleware
    } else {
        return next(createError(409, "Sorry, this username has been taken. Please choose another"));
    }    




}