import { Router } from "express";
import signupRouter from "./signupRouter.js";
import signinRouter from "./signinRouter.js";
import urlsRouter from "./urlsRouter.js";

const router = Router();

router.use(signupRouter);
router.use(signinRouter);
router.use(urlsRouter);

export default router;