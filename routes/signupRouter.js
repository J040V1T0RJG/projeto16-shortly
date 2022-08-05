import { Router } from "express";
import { createSignup } from "../controllers/signupController.js";

const signupRouter = Router();

signupRouter.post("/signup", createSignup);

export default signupRouter;