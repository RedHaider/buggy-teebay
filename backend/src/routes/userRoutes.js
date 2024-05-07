import Router from "express";

import { registerUser, loginUser } from "../controller/userController.js";

const router = Router();

// Registration route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

export default router;
