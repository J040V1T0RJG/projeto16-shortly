import { Router } from "express";
import { shortenUrl } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", shortenUrl);
urlsRouter.get("/urls/:id",);
urlsRouter.get("/urls/open/:shortUrl",);
urlsRouter.delete("/urls/:id",);

export default urlsRouter;