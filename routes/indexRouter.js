import { Router } from "express";
import signupRouter from "./signupRouter.js";
import signinRouter from "./signinRouter.js";

const router = Router();

router.use(signupRouter);
router.use(signinRouter);

export default router;