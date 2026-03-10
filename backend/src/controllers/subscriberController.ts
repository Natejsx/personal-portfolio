import { Request, Response } from "express";
import crypto from "crypto";
import Subscriber from "../models/Subscriber";
import Post from "../models/Post";
import { sendNewPostEmail } from "../services/emailService";

export async function subscribe(req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ message: "Valid email required" });
    return;
  }

  try {
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({ message: "Already subscribed" });
      return;
    }

    const unsubscribeToken = crypto.randomBytes(32).toString("hex");
    await Subscriber.create({ email, unsubscribeToken });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function unsubscribe(req: Request, res: Response): Promise<void> {
  const { token } = req.params;

  try {
    const subscriber = await Subscriber.findOneAndDelete({
      unsubscribeToken: token,
    });
    if (!subscriber) {
      res.status(404).send("Invalid unsubscribe link.");
      return;
    }
    res.send("You have been unsubscribed successfully.");
  } catch {
    res.status(500).send("Server error.");
  }
}

export async function sendNewsletter(
  req: Request,
  res: Response,
): Promise<void> {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) {
      res.json({ message: "No subscribers to send to", sent: 0 });
      return;
    }

    const results = await Promise.allSettled(
      subscribers.map((sub) =>
        sendNewPostEmail({
          postTitle: post.title,
          postDescription: post.description,
          postSlug: post.slug,
          subscriberEmail: sub.email,
          unsubscribeToken: sub.unsubscribeToken,
        }),
      ),
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    res.json({ message: `Newsletter sent`, sent, failed });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
