import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PostMeta, Posts as staticPosts } from "../../data/post";
import { adminFetchAllPosts, adminDeletePost } from "../../services/api";
import "../../styles/admin.scss";

type PostRow = PostMeta & { source: "static" | "db" };

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    adminFetchAllPosts(token)
      .then((dbPosts) => {
        const dbSlugs = new Set(dbPosts.map((p) => p.slug));
        const rows: PostRow[] = [
          ...dbPosts.map((p) => ({ ...p, source: "db" as const })),
          ...staticPosts
            .filter((p) => !dbSlugs.has(p.slug))
            .map((p) => ({ ...p, source: "static" as const })),
        ];
        setPosts(rows);
      })
      .catch(() => setError("Failed to load posts."))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleDelete(slug: string) {
    if (!token) return;
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    try {
      await adminDeletePost(slug, token);
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      alert("Failed to delete post.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="admin-layout">
      <div className="admin-dashboard">
        <div className="admin-dashboard__header">
          <h1>Blog Posts</h1>
          <div className="admin-dashboard__actions">
            <Link to="/admin/new" className="admin-btn admin-btn--primary">
              + New Post
            </Link>
            <button className="admin-btn admin-btn--ghost" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {loading && <p className="admin-status">Loading…</p>}
        {error && <p className="admin-error">{error}</p>}

        {!loading && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Tags</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>{post.tags.join(", ")}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${post.source}`}>
                      {post.source === "db" ? "DB" : "Static"}
                    </span>
                  </td>
                  <td className="admin-table__actions">
                    {post.source === "db" ? (
                      <>
                        <Link to={`/admin/edit/${post.slug}`} className="admin-btn admin-btn--sm">
                          Edit
                        </Link>
                        <button
                          className="admin-btn admin-btn--sm admin-btn--danger"
                          onClick={() => handleDelete(post.slug)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="admin-muted">Read-only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
