import express from "express";
import verifyLogin from "../controllers/authController.js";
const router = express.Router();

router.post("/", verifyLogin);

export default router;
