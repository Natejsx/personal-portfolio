import React, { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav } from "../components/nav";
import "../styles/Blog.scss";
import "../styles/blogPost.scss";
import BlogPostCard from "../components/BlogPostCard";
import { Posts } from "@/data/post"; 
import logo from "../../public/assets/images/logo.jpg";

export const BlogBanner = () => {
  return (
    <div className="blogBanner-container">
      <div className="blog-banner-content">
        <span className="welcome-text">Welcome to my blog</span>
        <h1 className="blog-title">
          Thoughts & <span className="highlight">&lt;Insights/&gt;</span>
        </h1>
        <p className="blog-subtitle">
          Sharing my <span className="highlight">&lt;Journey/&gt;</span> through
          web development, technology, and life
        </p>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <i className="bx bx-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

interface BlogFilterProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
  activeCategory: string;
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
  onSearch,
  onCategoryFilter,
  activeCategory
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <section className="blog-filter-container">
      <div className="filter-top">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search &lt;blog/&gt; posts..."
            onChange={handleInputChange}
          />
          <i className="bx bx-search"></i>
        </div>
      </div>
      <div className="filter-bottom">
        <button
          className={activeCategory === "All" ? "active" : ""}
          onClick={() => onCategoryFilter("All")}
        >
          All
        </button>
        {Filters.map((element, index) => (
          <button
            key={index}
            className={activeCategory === element ? "active" : ""}
            onClick={() => onCategoryFilter(element)}
          >
            {element}
          </button>
        ))}
      </div>
    </section>
  );
};

export const BlogNewsLetter = () => {
  return (
    <section className="blog-newsletter">
      <div className="newsletter-container">
        <h1>Stay Updated</h1>
        <h3>
          Join my newsletter to recieve the latest posts and insights directly
          in your inbox
        </h3>
        <form action="">
          <input type="email" placeholder="Enter your email" required />
          <input type="submit" value="Subscribe" />
        </form>
      </div>
    </section>
  );
};

const Filters = [
  "Personal",
  "Mental Health",
  "Philosophy",
  "Self-Improvement",
  "Relationships",
  "Career",
  "Web Development",
  "Programming",
  "React",
  "TypeScript",
];

export const Blog = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredPosts = React.useMemo(() => {
    let results = Posts;

    // Filter by category
    if (activeCategory !== "All") {
      results = results.filter((p) =>
        p.tags.some((t) => t === activeCategory)
      );
    }

    // Filter by search term
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return results;
  }, [searchTerm, activeCategory]);

  const handleSearch = (term: string) => setSearchTerm(term);
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    setSearchTerm(""); // Clear search when changing category
  };

  return (
    <section id="blog">
      <Nav />
      <BlogBanner />
      <BlogFilter
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        activeCategory={activeCategory}
      />
      <div className="blog-content-wrapper">
        <div className="post-container">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((p) => (
              <BlogPostCard
                key={p.slug}
                slug={p.slug}
                postName={p.title}
                postDesc={p.description}
                postDate={p.date}
                filters={p.tags}
                image={p.image}
                readingTime={p.readingTime}
                onSearch={handleSearch}
              />
            ))
          ) : (
            <div className="no-results">
              <i className="bx bx-search-alt"></i>
              <h3>No posts found</h3>
              <p>
                {searchTerm
                  ? `No posts matching "${searchTerm}"`
                  : `No posts in category "${activeCategory}"`}
              </p>
              <button onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <BlogNewsLetter />
    </section>
  );
};

// Calculate reading time based on word count
// const calculateReadingTime = (content: string): number => {
//   const wordsPerMinute = 200;
//   const wordCount = content.split(/\s+/).length;
//   return Math.ceil(wordCount / wordsPerMinute);
// };

export const BlogPostDetails = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = Posts.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (post) {
      window.scrollTo(0, 0);
      document.title = `${post.title} | Nate's Blog`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="blog-loading">
        <h2>Post not found</h2>
        <Link to="/blog" className="back-link">Return to Blog</Link>
      </div>
    );
  }

  const Content = post.component;
  const primaryCategory = post.tags[0] || "Article";

  return (
    <div className="modern-blog-page">
      <main className="blog-main-content">
        {/* Simple Back Navigation */}
        <div className="blog-back-nav">
          <Link to="/blog" className="back-nav-link">
            <i className="bx bx-chevron-left"></i>
            <span>Back to Blog</span>
          </Link>
        </div>
        {/* Hero Image */}
        <div className="blog-hero-image">
          <img src={post.image} alt={post.title} />
        </div>

        {/* Article Header */}
        <div className="blog-article-header">
          <div className="header-meta-row">
            <span className="category-badge">{primaryCategory}</span>
            <span className="read-time-badge">
              <i className="bx bx-time-five"></i>
              {post.readingTime} min read
            </span>
          </div>

          <h1 className="article-main-title">{post.title}</h1>

          <div className="author-section">
            <div className="author-info-left">
              <div className="author-avatar-img">
                <img src={logo} alt="" />
              </div>
              <div className="author-text">
                <p className="author-name-text">Nate</p>
                <p className="publish-date-text">
                  <i className="bx bx-calendar"></i>
                  {post.date}
                </p>
              </div>
            </div>

            <div className="article-tags-row">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-badge">
                  <i className="bx bx-purchase-tag"></i>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="content-separator"></div>

        {/* Article Content */}
        <article className="blog-article-content">
          <div className="content-card">
            <Suspense fallback={<div className="content-loading">Loading article...</div>}>
              <Content />
            </Suspense>
          </div>
        </article>

        {/* CTA Section */}
        {/* <div className="blog-cta-section">
          <div className="cta-card">
            <i className="bx bx-code-alt cta-icon"></i>
            <h3 className="cta-title">Want to work together?</h3>
            <p className="cta-description">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-btn-primary">
                Get in Touch
              </Link>
              <Link to="/portfolio" className="cta-btn-secondary">
                View Portfolio
              </Link>
            </div>
          </div>
        </div> */}

        {/* Related Posts */}
        <section className="related-posts-section">
          <h3 className="related-posts-title">
            <i className="bx bx-book-reader"></i>
            Read Next
          </h3>
          <div className="related-posts-grid">
            {Posts.filter((p) =>
              p.tags.some(tag => post.tags.includes(tag)) && p.slug !== post.slug
            )
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="related-post-card"
                >
                  <div className="related-post-image">
                    <img src={relatedPost.image} alt={relatedPost.title} />
                  </div>
                  <div className="related-post-content">
                    <span className="related-post-category">{relatedPost.tags[0]}</span>
                    <h4 className="related-post-title">{relatedPost.title}</h4>
                    <p className="related-post-excerpt">{relatedPost.description}</p>
                    <div className="related-post-footer">
                      <span className="related-post-time">{relatedPost.readingTime} min read</span>
                      <i className="bx bx-right-arrow-alt"></i>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Back to Blog */}
        <div className="back-to-blog-section">
          <Link to="/blog" className="back-to-blog-btn">
            <i className="bx bx-chevron-left"></i>
            Back to All Articles
          </Link>
        </div>
      </main>
    </div>
  );
};
