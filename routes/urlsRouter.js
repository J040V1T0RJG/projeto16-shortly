import { Router } from "express";
import { shortenUrl, getUrls, getUrlsOpenShortUrl } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", shortenUrl);
urlsRouter.get("/urls/:id", getUrls);
urlsRouter.get("/urls/open/:shortUrl", getUrlsOpenShortUrl);
urlsRouter.delete("/urls/:id",);

export default urlsRouter;