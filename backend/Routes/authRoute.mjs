import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/authController.mjs";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.mjs";

//router object

const router = express.Router();
//router for registration
router.route("/register").post(registerController);

//router for login
router.route("/login").post(loginController);

//router for test
router.route("/test").get(requireSignIn, isAdmin, testController);

export default router;
