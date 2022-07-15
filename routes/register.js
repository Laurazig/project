import express from "express";
import { registerPost } from "../controllers/registerController.js";
import requiredValues from "../validators/requiredValues.js";
import checkValidation from "../validators/checkValidation.js";
import registerValidator from "../validators/registerValidator.js";

const router = express.Router();
//          path    val middleware                                                          controller func
router.post("/", requiredValues(["username", "password", "emailAddress"]),registerValidator(), checkValidation, registerPost);    // POST /register

export default router;
