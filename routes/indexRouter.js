import { Router } from "express";
import signupRouter from "./signupRouter.js";
import signinRouter from "./signinRouter.js";
import urlsRouter from "./urlsRouter.js";
import usersRouter from "./usersRouter.js";
import rankingRouter from "./rankingRouter.js";

const router = Router();

router.use(signupRouter);
router.use(signinRouter);
router.use(urlsRouter);
router.use(usersRouter);
router.use(rankingRouter);

export default router;