import User from "../models/user.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";

export const registerPost = async (req, res, next) => {
    const { username, password, firstName, lastName, emailAddress, teacher } = req.body;

    let foundUsername;
    try{
        foundUsername = await User.findOne({ username: username});
    } catch {
        return next(createError(500,"database could not be queried. registerController.js"))
    }
    if(foundUsername) {
        return next(createError(409,"username already taken. registerController.js"))
    }
    let foundEmail;
    try{
        foundEmail = await User.findOne({ emailAddress: emailAddress});
    } catch {
        return next(createError(500,"database could not be queried. registerController.js"))
    }
    if(foundEmail) {
        return next(createError(409,"email address is taken. registerController.js"))
    } 
    const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        teacher:teacher,
        courses: [],
        
    });
    try {
        await newUser.save();   // We could get a validation error here if the schema is not fulfilled
    } catch {
        return next(createError(500, "User could not be created. registerController.js"));
    }
    //create& issue JWT
    let newToken;
    try{
        newToken= jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {expiresIn: "1h"})
        res.cookie("dataCookie", newToken, {httpOnly: true,sameSite:"Strict"})
    } catch {
        return next (createError(500, "signup not completed. registerController.js"))
    }
    res.status(201).json({ id: newUser._id, token: newToken });
}