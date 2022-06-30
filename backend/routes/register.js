import express from "express";
import { registerPost } from "../controllers/registerController.js"

const router= express.Router();

router.post("/", registerPost);

export default router