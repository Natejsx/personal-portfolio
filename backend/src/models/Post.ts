export interface IPost {
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
