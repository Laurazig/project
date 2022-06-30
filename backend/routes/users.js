import express from "express";
import { getUserData, postCourse, deleteCourses } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", getUserData);    // GET /user/1234

router.post("/:id/albums", postCourse);    // POST /user/1234/albums

router.delete("/:id/albums", deleteCourses);    // DELETE /user/1234/albums

export default router;