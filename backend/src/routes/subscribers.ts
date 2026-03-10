import { Router } from "express";
import { subscribe, unsubscribe, sendNewsletter } from "../controllers/subscriberController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", subscribe);
router.get("/unsubscribe/:token", unsubscribe);
router.post("/:slug/send-newsletter", requireAuth, sendNewsletter);

export default router;
