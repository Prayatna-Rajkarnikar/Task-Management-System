import { Router } from "express";

import {
  loginUser,
  registerUser,
  logout,
} from "../controller/userController.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;
