import React from 'react';
import '../styles/TestimonialCard.scss';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  image,
}) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <div className="quote-icon">
          <i className="bx bxs-quote-left"></i>
        </div>
        <p className="quote-text">{quote}</p>
      </div>
      <div className="testimonial-author">
        {image && (
          <div className="author-image">
            <img src={image} alt={`${name} - ${title}`} />
          </div>
        )}
        <div className="author-info">
          <h4 className="author-name">{name}</h4>
          <p className="author-title">{title}</p>
        </div>
      </div>
    </div>
  );
};
