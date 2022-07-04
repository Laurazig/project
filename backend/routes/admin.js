import express from "express";
import { countUsers } from "../controllers/adminController.js";
import isAdmin from "../middleware/checkIsAdmin.js";

const router = express.Router();
router.use(isAdmin);
router.get("/:id/count", countUsers)     //not working 
export default router;
