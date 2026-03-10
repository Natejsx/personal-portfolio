// postsController.ts
import { Request, Response } from 'express';

export const getAllPosts = (req: Request, res: Response) => {
  const posts = [ /* some fake data or database result */ ];
  res.json(posts); // send the posts back to the user
};



