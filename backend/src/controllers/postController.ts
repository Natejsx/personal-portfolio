import { Request, Response } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebaseAdmin";
import { IPost } from "../models/Post";

const POSTS = "posts";

export async function getAllPosts(_req: Request, res: Response): Promise<void> {
  try {
    const snapshot = await db.collection(POSTS)
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .get();
    const posts = snapshot.docs.map((doc) => {
      const { content, ...rest } = doc.data() as IPost;
      return rest;
    });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllPostsAdmin(_req: Request, res: Response): Promise<void> {
  try {
    const snapshot = await db.collection(POSTS)
      .orderBy("createdAt", "desc")
      .get();
    const posts = snapshot.docs.map((doc) => {
      const { content, ...rest } = doc.data() as IPost;
      return rest;
    });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getPostBySlug(req: Request, res: Response): Promise<void> {
  try {
    const doc = await db.collection(POSTS).doc(req.params.slug as string).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(doc.data());
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function createPost(req: Request, res: Response): Promise<void> {
  try {
    const { slug, title, description, date, tags, image, readingTime, content, published } = req.body;

    const docRef = db.collection(POSTS).doc(slug);
    const existing = await docRef.get();
    if (existing.exists) {
      res.status(409).json({ message: "A post with this slug already exists" });
      return;
    }

    const post = { slug, title, description, date, tags, image, readingTime, content, published: published ?? true, createdAt: FieldValue.serverTimestamp() };
    await docRef.set(post);
    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  try {
    const docRef = db.collection(POSTS).doc(req.params.slug as string);
    const existing = await docRef.get();
    if (!existing.exists) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    await docRef.update(req.body);
    const updated = await docRef.get();
    res.json(updated.data());
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  try {
    const docRef = db.collection(POSTS).doc(req.params.slug as string);
    const existing = await docRef.get();
    if (!existing.exists) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    await docRef.delete();
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
