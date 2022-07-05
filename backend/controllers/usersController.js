//GET findById  .populate  
//PATCH findById findByIdAndUpdate   $push

import createError from "http-errors";
import User from "../models/user.js";

// ==============================================
// GET the logged in user's data
// ==============================================

export const getUserData = async (req, res, next) => {
    // Take the :id parameter from the request path ("/users/:id/courses")
    const userId = req.params.id;

    // Try to find a user in the "users" collection with the same id
    // If you find a user object with the correct id, make a copy and put it in the "foundUser" variable
    // If you do not find the user, "foundUser" = undefined
    let foundUser; 
    
    try {
       foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "Couldn't query database. Please try again"));
    }

    // If a user was found with the same id as the :id parameter...
    if (foundUser) {
        // Send in the response back to the frontend:
        //  - firstName
        //  - list of courses

        // * New: 14/06
        // Before using populate, the "courses" array contains only ObjectIds
        // Now let's populate the user's "courses" array - for each id, go across to the "courses" collection and "fill in" the details of each course
        // await foundUser.populate("courses", {  //deactivated to show name
        //     _id: 1,
        //     courseTitle: 1,
        //     courseDate: 1,
        //     school: 1
        // });

        // ? The second argument lets you specify which keys to return in case you don't want all of them...
        // await foundUser.populate("courses", {
        //     _id: 1,
        //     courseTitle: 1
        // });

        const userData = {
            firstName: foundUser.firstName,
            courses: foundUser.courses,
            teacher:foundUser.teacher
        }
        res.json(userData);
    
    // If no user was found with the same id as the :id parameter...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        next(createError(404, "User could not be found"));
    }
}




// ==============================================================
// PATCH Update the logged-in user's "courses" array with a new course id
// ==============================================================

export const updateCourses = async (req, res, next) => {
    const courseId = req.body.id;    // id of the course the user just added
    const userId = req.params.id;   // id of the current logged-in user

    let foundUser;

    // Use Mongoose to find the user's document in the "users" collection
    // This way, we can find out the ids of all the courses they already added
    try {
        // foundUser = the current logged-in user's document from the "users" collection
        // foundUser.courses = an array of the ids of all the courses added by the current user
        foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "Query could not be completed. Please try again"))
    }

    // Check if the current user already added the course they just made
    // (courseId = the id of the course the user just made in the browser)
    const foundCourse = foundUser.courses.find(existingId => existingId == courseId);

    // So did the user already have the id of the course they're trying to add in their "courses" array?
    // * Case 1 - the user didn't already have the album's id in their "courses" array:
    if (!foundCourse) {
        let updatedUser;

        try {
            // (1) the id of the user to update
            // (2) how to update them
            // (3) options
            updatedUser = await User.findByIdAndUpdate(userId, { $push: { courses: courseId }}, { new: true, runValidators: true });
        } catch {
            return next(createError(500, "User could not be updated. Please try again"));
        }

        await updatedUser.populate("courses", {
            _id: 1,
            courseTitle: 1,
            courseDate: 1,
            school: 1,
        })

        res.json({ courses: updatedUser.courses });
    } else {
        // * Case 2: the course id already exists in the user's "courses" array (oh no!)
        // We don't want to add the same id twice, so let's send an error back to the frontend
        next(createError(409, "The album already exists in your collection!"));
    }
}

// ==========================================================
// DELETE all courses from the logged in user's "courses" list
// ==========================================================

export const deleteCourses = async (req, res, next) => {
    const userId = req.params.id;

    // * Task 6 - Find the user who sent the request...
    // * ... and update their "courses" array to be an empty arry
    let updatedUser;

    try {
        updatedUser = await User.findByIdAndUpdate(userId, { courses: [] }, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "User could not be updated. Please try again"));
    }
    
    res.json(updatedUser.courses);
}

// ==========================================================
// DELETE a single course from the logged in user's "courses" list
// ==========================================================

export const deleteCourse = async (req, res, next) => {
    const userId = req.params.id;
    const courseId = req.params.courseId;

    let updatedUser;

    try {
        // findByIdAndUpdate = change part of the document
        // findByIdAndRemove = delete the full document!
        // * Task 15 update: now we want to pull the item from the user's "courses" array which is EQUAL TO the albumId received in the request URL's params
        updatedUser = await User.findByIdAndUpdate(userId, { $pull: { courses: albumId }}, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "User could not be updated. Please try again"));
    }

    await updatedUser.populate("courses"); 

    res.json({ courses: updatedUser.courses });
}

// ==========================================================
// DELETE a user from the "users" collection
// ==========================================================

export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndRemove(userId);
    } catch {
        return next(createError(500, "User could not be deleted. Please try again"));
    }

    res.json({ message: "Your account has been successfully deleted. Come back soon!" });
}