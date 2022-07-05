import createError from "http-errors";
import User from "../models/user.js";
export const countUsers = async (req, res, next) => {
    let numOfDocs;
    try {
        numOfDocs = await User.countDocuments({})
    }  catch {
        return next(createError(500, "database could not be queried. teacherController.js"))
    }
    res.json({count:numOfDocs})
}
