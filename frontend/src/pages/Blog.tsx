import React, { Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Nav } from '../components/nav';
import '../styles/Blog.scss';
import '../styles/blogPost.scss';
import BlogPostCard from '../components/BlogPostCard';
import { Posts } from '@/data/post';
import logo from '../../public/assets/images/logo.jpg';

const LIFE_TAGS = ['Personal', 'Mental Health', 'Philosophy', 'Self-Improvement', 'Relationships', 'Career'];
const CODING_TAGS = ['Web Development', 'Programming', 'React', 'TypeScript'];

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

const BlogCategorySelect = ({
  onSelect,
}: {
  onSelect: (cat: 'life' | 'coding') => void;
}) => {
  const lifeCount = Posts.filter((p) =>
    p.tags.some((t) => LIFE_TAGS.includes(t))
  ).length;
  const codingCount = Posts.filter((p) =>
    p.tags.some((t) => CODING_TAGS.includes(t))
  ).length;

  return (
    <section className="blog-category-select">
      <div className="category-select-header">
        <h2>What would you like to read?</h2>
        <p>Choose a category to explore</p>
      </div>
      <div className="category-cards">
        <div className="category-card life" onClick={() => onSelect('life')}>
          <div className="category-card-icon">
            <i className="bx bx-heart"></i>
          </div>
          <div className="category-card-body">
            <h3>Life</h3>
            <p>
              Personal stories, mental health, philosophy, relationships, and
              more
            </p>
            <span className="post-count">{lifeCount} posts</span>
          </div>
          <div className="category-card-arrow">
            <i className="bx bx-right-arrow-alt"></i>
          </div>
        </div>

        <div className="category-card coding" onClick={() => onSelect('coding')}>
          <div className="category-card-icon">
            <i className="bx bx-code-alt"></i>
          </div>
          <div className="category-card-body">
            <h3>Coding</h3>
            <p>
              Web development, programming tutorials, and technical insights
            </p>
            <span className="post-count">{codingCount} posts</span>
          </div>
          <div className="category-card-arrow">
            <i className="bx bx-right-arrow-alt"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

interface BlogFilterProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
  activeCategory: string;
  filters: string[];
  categoryLabel: string;
  onBack: () => void;
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
  onSearch,
  onCategoryFilter,
  activeCategory,
  filters,
  categoryLabel,
  onBack,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <section className="blog-filter-container">
      <div className="filter-breadcrumb">
        <button className="back-btn" onClick={onBack}>
          <i className="bx bx-chevron-left"></i>
          Blog
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{categoryLabel}</span>
      </div>
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
          className={activeCategory === 'All' ? 'active' : ''}
          onClick={() => onCategoryFilter('All')}
        >
          All
        </button>
        {filters.map((element, index) => (
          <button
            key={index}
            className={activeCategory === element ? 'active' : ''}
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

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<
    'life' | 'coding' | null
  >(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categoryPosts = React.useMemo(() => {
    const reversed = [...Posts].reverse();
    if (selectedCategory === 'life')
      return reversed.filter((p) => p.tags.some((t) => LIFE_TAGS.includes(t)));
    if (selectedCategory === 'coding')
      return reversed.filter((p) =>
        p.tags.some((t) => CODING_TAGS.includes(t))
      );
    return reversed;
  }, [selectedCategory]);

  const filteredPosts = React.useMemo(() => {
    let results = categoryPosts;

    if (activeCategory !== 'All') {
      results = results.filter((p) => p.tags.some((t) => t === activeCategory));
    }

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
  }, [categoryPosts, searchTerm, activeCategory]);

  const handleSearch = (term: string) => setSearchTerm(term);
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    setSearchTerm('');
  };
  const handleSelectCategory = (cat: 'life' | 'coding') => {
    setSelectedCategory(cat);
    setSearchTerm('');
    setActiveCategory('All');
  };
  const handleBack = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setActiveCategory('All');
  };

  const activeFilters = selectedCategory === 'life' ? LIFE_TAGS : CODING_TAGS;
  const categoryLabel = selectedCategory === 'life' ? 'Life' : 'Coding';

  return (
    <section id="blog">
      <Nav />
      <BlogBanner />
      {!selectedCategory ? (
        <BlogCategorySelect onSelect={handleSelectCategory} />
      ) : (
        <>
          <BlogFilter
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            activeCategory={activeCategory}
            filters={activeFilters}
            categoryLabel={categoryLabel}
            onBack={handleBack}
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
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('All');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <BlogNewsLetter />
    </section>
  );
};

let lastScrolledSlug: string | null = null;

export const BlogPostDetails = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const post = Posts.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (post) {
      document.title = `${post.title} | Nate's Blog`;
      if (lastScrolledSlug !== slug) {
        window.scrollTo(0, 0);
        lastScrolledSlug = slug;
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="blog-loading">
        <h2>Post not found</h2>
        <Link to="/blog" className="back-link">
          Return to Blog
        </Link>
      </div>
    );
  }

  const Content = post.component;
  const primaryCategory = post.tags[0] || 'Article';

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
            <Suspense
              fallback={
                <div className="content-loading" style={{ minHeight: '100vh' }}>Loading article...</div>
              }
            >
              <Content />
            </Suspense>
          </div>
        </article>

        {/* Related Posts */}
        <section className="related-posts-section">
          <h3 className="related-posts-title">
            <i className="bx bx-book-reader"></i>
            Read Next
          </h3>
          <div className="related-posts-grid">
            {Posts.filter(
              (p) =>
                p.tags.some((tag) => post.tags.includes(tag)) &&
                p.slug !== post.slug
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
                    <span className="related-post-category">
                      {relatedPost.tags[0]}
                    </span>
                    <h4 className="related-post-title">{relatedPost.title}</h4>
                    <p className="related-post-excerpt">
                      {relatedPost.description}
                    </p>
                    <div className="related-post-footer">
                      <span className="related-post-time">
                        {relatedPost.readingTime} min read
                      </span>
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
