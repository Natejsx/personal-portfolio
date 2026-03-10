import { useState, useEffect } from "react";
import { PostMeta, Posts } from "../data/post";
import { fetchDBPosts } from "../services/api";

export function usePosts(): { posts: PostMeta[]; loading: boolean } {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDBPosts()
      .then((dbPosts) => {
        // Merge: DB posts first (newest), then static posts
        // Deduplicate by slug in case a static slug was reused
        const staticSlugs = new Set(dbPosts.map((p) => p.slug));
        const filteredStatic = Posts.filter((p) => !staticSlugs.has(p.slug));
        setPosts([...dbPosts, ...filteredStatic]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}
