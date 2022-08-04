import { Router } from "express";
import { postSignup } from "../controllers/signupController.js";

const signupRouter = Router();

signupRouter.post("/signup", postSignup);

export default signupRouter;