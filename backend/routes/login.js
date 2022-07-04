import express from "express";
import { loginPost } from "../controllers/loginController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";

const router = express.Router();

router.post("/",requiredValues(["username", "password"]), checkValidation, loginPost)    // POST /login

export default router;