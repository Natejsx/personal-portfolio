import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  readingTime: number;
  content: string;
  published: boolean;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  readingTime: { type: Number, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>("Post", PostSchema);
