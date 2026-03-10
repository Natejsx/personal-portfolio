import { PostMeta } from "../data/post";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export async function getHello() {
  const res = await fetch(`${BASE_URL}/hello`);
  const data = await res.json();
  return data.message;
}

// Public post API
export async function fetchDBPosts(): Promise<PostMeta[]> {
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    if (!res.ok) return [];
    const data = await res.json();
    return data as PostMeta[];
  } catch {
    return [];
  }
}

export async function fetchDBPostBySlug(slug: string): Promise<PostMeta | null> {
  try {
    const res = await fetch(`${BASE_URL}/posts/${slug}`);
    if (!res.ok) return null;
    return (await res.json()) as PostMeta;
  } catch {
    return null;
  }
}

// Admin API
export async function adminLogin(password: string): Promise<{ token: string }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error("Invalid password");
  return res.json();
}

export type NewPostPayload = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  readingTime: number;
  content: string;
  published: boolean;
};

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function adminFetchAllPosts(token: string): Promise<PostMeta[]> {
  const res = await fetch(`${BASE_URL}/posts/admin/all`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function adminCreatePost(data: NewPostPayload, token: string): Promise<PostMeta> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (res.status === 409) throw new Error("A post with this slug already exists");
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function adminUpdatePost(
  slug: string,
  data: Partial<NewPostPayload>,
  token: string
): Promise<PostMeta> {
  const res = await fetch(`${BASE_URL}/posts/${slug}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function adminDeletePost(slug: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/posts/${slug}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete post");
}
