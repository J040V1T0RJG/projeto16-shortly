import { Router } from "express";
import { shortenUrl, getUrls } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", shortenUrl);
urlsRouter.get("/urls/:id", getUrls);
urlsRouter.get("/urls/open/:shortUrl",);
urlsRouter.delete("/urls/:id",);

export default urlsRouter;