import { Request, Response } from "express";
import Post from "../models/Post";

export async function getAllPosts(_req: Request, res: Response): Promise<void> {
  try {
    const posts = await Post.find({ published: true })
      .select("-content")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllPostsAdmin(_req: Request, res: Response): Promise<void> {
  try {
    const posts = await Post.find().select("-content").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getPostBySlug(req: Request, res: Response): Promise<void> {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function createPost(req: Request, res: Response): Promise<void> {
  try {
    const { slug, title, description, date, tags, image, readingTime, content, published } = req.body;

    const existing = await Post.findOne({ slug });
    if (existing) {
      res.status(409).json({ message: "A post with this slug already exists" });
      return;
    }

    const post = await Post.create({ slug, title, description, date, tags, image, readingTime, content, published });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
