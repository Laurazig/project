import express from "express";
import { getUserData, updateCourses, deleteCourses, deleteCourse, deleteUser } from "../controllers/usersController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import authoriseUser from "../middleware/authoriseUser.js";

const router = express.Router();

router.use(authoriseUser)  //cookie 

router.get("/:id", getUserData);    // GET /users/1234

router.patch("/:id/courses", requiredValues(["id"]), checkValidation, updateCourses);  // PATCH /users/1234/albums

router.delete("/:id/courses", deleteCourses);    // DELETE /users/1234/albums

router.delete("/:id/courses/:courseId", deleteCourse);  // DELETE /users/1234/albums/5678

router.delete("/:id", deleteUser);    // DELETE /users/1234

export default router;