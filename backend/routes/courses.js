import express from "express";
import { coursesPost } from "../controllers/coursesController.js";
import authoriseUser from "../middleware/authoriseUser.js";
import courseValidator from "../validators/courseValidator.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";

const router = express.Router();

router.use(authoriseUser)

router.post("/", requiredValues(["courseTitle", "school", "courseDate"]), courseValidator(), checkValidation, coursesPost);    // POST /albums

export default router;