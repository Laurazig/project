import express from "express";
import { countUsers } from "../controllers/teacherController.js";
import teacher from "../middleware/checkTeacher.js";

const router = express.Router();
router.use(teacher);
router.get("/:id/count", countUsers)     //not working 
export default router;
