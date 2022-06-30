import express from "express";
import { loginPost } from "../controllers/loginController.js";

const router = express.Router();

router.post("/", loginPost)    // POST /login

export default router;