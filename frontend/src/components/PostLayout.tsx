import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/postLayout.scss';

interface PostLayoutProps {
  title: string;
  author: string;
  date: string;
  readingTime: string;
  featuredImage: string;
  children: React.ReactNode;
}

export const PostLayout: React.FC<PostLayoutProps> = ({
  title,
  author,
  date,
  readingTime,
  featuredImage,
  children,
}) => {
  return (
    <article className="post-layout">
      <header className="post-header">
        <h1 className="post-title">{title}</h1>
        <p className="post-meta">
          By{' '}
          <span className="author">
            {author} • <time dateTime={date}>{date}</time> • {readingTime}
          </span>
        </p>
      </header>

      {featuredImage && (
        <figure className="featured-image">
          <img src={featuredImage} alt={`${title} cover`} />
        </figure>
      )}

      <section className="post-content">{children}</section>

      <footer className="post-footer">
        <div className="back-to-blog">
          <Link to="/Blog">Back to Blog</Link>
        </div>
      </footer>
    </article>
  );
};
