// import { v4 as uuid } from "uuid";
import User from "../models/user.js";
import createError from "http-errors";

// ==============================================
// GET the logged in user's data
// ==============================================
export const getUserData = async (req, res, next) => {
    // Take the :id parameter from the request path ("/users/:id/albums")
    const userId = req.params.id;
    //  find in database "users" array === id / YES put in "foundUser" variable
    let foundUser;     //30.05.22
    try {
        foundUser = await User.findOne({_id:userId}) //name:name, age:age
    } catch {
        return next(createError(500, "user could not be create(hello http-errors!). Please try again"));
    }
    // If user found with the same id as the :id parameter ->Send name& A_list in response back to FE
    if (foundUser) {
        const userData = {
            firstName: foundUser.firstName,
            albums: foundUser.albums
        }
        res.json(userData);
    // no user found with same id as :id parameter...Create an error object -pass to err h. middleware
    } else {
        next(new createError.InternalServerError("user could not be created. Please try again"))
    }
}
// =======================================================
// POST a new course to the logged in user's "courses" list
// =======================================================

export const postCourse = async (req, res, next) => {
    const { school, courseTitle, courseDate } = req.body;

    const newCourse = {          //newAlbum
        school: school,         //band
        courseTitle: courseTitle, //albumTitle
        courseDate: courseDate    //albumYear
    }

    // Take the user's id from the "id" parameter of their request URL
    const userId = req.params.id;

    // Find the index of the user inside the "users" array of the database file

    // Search in the user's array of courses to see if they already have the new course there
    const newUser= await User.findByIdAndUpdate(userId, {$push:{courses:newCourse}},{new:true,runValidators:true})
    const allAlbums=newUser.albums
        res.status(201).json(allAlbums);
}

// =======================================================
// DELETE all courses  from the logged in user's "course" list
// ==========================================================

export const deleteCourses = async (req, res, next) => {
    const userId = req.params.id;

   let indexOfUser;
   try {
       indexOfUser = await User.findIndex({_id:userId})
   } catch {
       return next(new createError.InternalServerError("delete error"));
   }
    // If the user exists in the db...
    if (indexOfUser > -1) {
        db.data.users[indexOfUser].albums = [];

        await db.write();
    
        res.json(db.data.users[indexOfUser].albums);
    
    // If the user does not exist in the db...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        const err = new Error("User could not be found");
        err.statusCode = 404;
        next(err);
    }
}