import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { useAuth } from "../../context/AuthContext";
import { fetchDBPostBySlug, adminCreatePost, adminUpdatePost, adminSendNewsletter, NewPostPayload } from "../../services/api";
import "../../styles/admin.scss";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function todayFormatted(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const EMPTY_FORM: NewPostPayload = {
  slug: "",
  title: "",
  description: "",
  date: todayFormatted(),
  tags: [],
  image: "",
  readingTime: 5,
  content: "",
  published: true,
};

export default function PostEditor() {
  const { slug } = useParams<{ slug?: string }>();
  const isEdit = Boolean(slug);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<NewPostPayload>(EMPTY_FORM);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    if (!isEdit || !slug) return;
    fetchDBPostBySlug(slug).then((post) => {
      if (!post || !post.content) {
        navigate("/admin");
        return;
      }
      setForm({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        image: post.image,
        readingTime: post.readingTime,
        content: post.content,
        published: post.published ?? true,
      });
      setTagsInput(post.tags.join(", "));
      setLoading(false);
    });
  }, [isEdit, slug, navigate]);

  function set<K extends keyof NewPostPayload>(key: K, value: NewPostPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    set("title", title);
    if (!isEdit) set("slug", toSlug(title));
  }

  function handleTagsBlur() {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    set("tags", tags);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      if (isEdit && slug) {
        await adminUpdatePost(slug, form, token);
      } else {
        await adminCreatePost(form, token);
      }
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="admin-layout"><p className="admin-status">Loading…</p></div>;

  return (
    <div className="admin-layout">
      <div className="post-editor">
        <div className="post-editor__header">
          <h1>{isEdit ? "Edit Post" : "New Post"}</h1>
          <button className="admin-btn admin-btn--ghost" onClick={() => navigate("/admin")}>
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="post-editor__form">
          <div className="post-editor__fields">
            <label>
              Title
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </label>

            <label>
              Slug
              <div className="post-editor__slug-row">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="admin-btn admin-btn--sm"
                  onClick={() => set("slug", toSlug(form.title))}
                >
                  Generate
                </button>
              </div>
            </label>

            <label>
              Description
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                required
              />
            </label>

            <div className="post-editor__row">
              <label>
                Date
                <div className="post-editor__slug-row">
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn--sm"
                    onClick={() => set("date", todayFormatted())}
                  >
                    Today
                  </button>
                </div>
              </label>

              <label>
                Reading Time (min)
                <input
                  type="number"
                  min={1}
                  value={form.readingTime}
                  onChange={(e) => set("readingTime", Number(e.target.value))}
                  required
                />
              </label>
            </div>

            <label>
              Tags (comma-separated)
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onBlur={handleTagsBlur}
                placeholder="Personal, Philosophy, Web Development"
              />
            </label>

            <label>
              Image Path
              <input
                type="text"
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="/assets/images/my-post.jpg"
                required
              />
            </label>

            <label className="post-editor__checkbox">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set("published", e.target.checked)}
              />
              Published
            </label>
          </div>

          <div className="post-editor__content">
            <label>Content (Markdown)</label>
            <div data-color-mode="dark">
              <MDEditor
                value={form.content}
                onChange={(val) => set("content", val ?? "")}
                height={500}
              />
            </div>
          </div>

          {error && <p className="admin-error">{error}</p>}

          <div className="post-editor__footer">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
            </button>

            {isEdit && slug && (
              <div className="post-editor__newsletter">
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  disabled={newsletterStatus === 'sending'}
                  onClick={async () => {
                    if (!token) return;
                    setNewsletterStatus('sending');
                    try {
                      const result = await adminSendNewsletter(slug, token);
                      setNewsletterStatus('sent');
                      alert(`Newsletter sent to ${result.sent} subscriber${result.sent !== 1 ? 's' : ''}${result.failed > 0 ? ` (${result.failed} failed)` : ''}.`);
                    } catch {
                      setNewsletterStatus('error');
                      alert('Failed to send newsletter.');
                    }
                  }}
                >
                  {newsletterStatus === 'sending' ? 'Sending…' : '✉ Send Newsletter'}
                </button>
                {newsletterStatus === 'sent' && <span className="admin-muted">Sent!</span>}
                {newsletterStatus === 'error' && <span className="admin-error">Failed to send.</span>}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
