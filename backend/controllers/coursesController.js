import Course from "../models/course.js";
import createError from "http-errors";

export const coursesPost = async (req, res, next) => {
    // This will help you get started with checking if the same course already exists in the user's "courses" array.
    let existingCourse;

    // Remember: req.body = the album object the user tried to create in the browser.
    // Example req.body = { band: "Black Sabbath", albumTitle: "KFE", albumYear: 2022 }

    // ? Question 1: Does the course the user just tried to add already exist in the "courses" collection?
    try {
        existingCourse = await Course.findOne(req.body);
    } catch {
        return next(createError(500, "Query didn't succeed. Please try again"));
    }

    // ? Question 2: Did we find an existing course with the same details in the "courses" collection?
    // If yes, simply send back the id of the existing course in the server's response
    if (existingCourse) {
        res.json({ id: existingCourse._id });
    // If no, create a new course document, save it in the "courses" collection, and send back its id in the server's response
    } else {
        let newCourse;
        
        try {
            // Create a new course document using the "Course" model
            newCourse = new Course(req.body);
            // Save the new course document in the "courses" collection
            await newCourse.save();
        } catch {
            return next(createError(500, "Course couldn't be created. Please try again"));
        }
        
        res.json({ id: newCourse._id });
    }
}