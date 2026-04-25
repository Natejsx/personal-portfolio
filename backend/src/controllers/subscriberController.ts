import { Request, Response } from "express";
import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebaseAdmin";
import { IPost } from "../models/Post";
import { ISubscriber } from "../models/Subscriber";
import { sendNewPostEmail } from "../services/emailService";

const SUBSCRIBERS = "subscribers";
const POSTS = "posts";

export async function subscribe(req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ message: "Valid email required" });
    return;
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await db.collection(SUBSCRIBERS)
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existing.empty) {
      res.status(409).json({ message: "Already subscribed" });
      return;
    }

    const unsubscribeToken = crypto.randomBytes(32).toString("hex");
    await db.collection(SUBSCRIBERS).add({
      email: normalizedEmail,
      unsubscribeToken,
      subscribedAt: FieldValue.serverTimestamp(),
    });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function unsubscribe(req: Request, res: Response): Promise<void> {
  const { token } = req.params;

  try {
    const snapshot = await db.collection(SUBSCRIBERS)
      .where("unsubscribeToken", "==", token)
      .limit(1)
      .get();

    if (snapshot.empty) {
      res.status(404).send("Invalid unsubscribe link.");
      return;
    }

    await snapshot.docs[0].ref.delete();
    res.send("You have been unsubscribed successfully.");
  } catch {
    res.status(500).send("Server error.");
  }
}

export async function sendNewsletter(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;

  try {
    const postDoc = await db.collection(POSTS).doc(slug as string).get();
    if (!postDoc.exists) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    const post = postDoc.data() as IPost;

    const subscribersSnapshot = await db.collection(SUBSCRIBERS).get();
    if (subscribersSnapshot.empty) {
      res.json({ message: "No subscribers to send to", sent: 0 });
      return;
    }

    const subscribers = subscribersSnapshot.docs.map((doc) => doc.data() as ISubscriber);

    const results = await Promise.allSettled(
      subscribers.map((sub) =>
        sendNewPostEmail({
          postTitle: post.title,
          postDescription: post.description,
          postSlug: post.slug,
          subscriberEmail: sub.email,
          unsubscribeToken: sub.unsubscribeToken,
        })
      )
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;
    res.json({ message: "Newsletter sent", sent, failed });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
