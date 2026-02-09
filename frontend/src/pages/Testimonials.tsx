import React from 'react';
import { TestimonialCard } from '../components/TestimonialCard';
import '../styles/Testimonials.scss';
import { Nav } from '../components/nav';
import { testimonials } from '../data/testinomial';

export const Testimonials: React.FC = () => {
  return (
    <div className="testimonials-container">
      <Nav />
      <div className="testimonials-header">
        <h1>Testimonials</h1>
        <p>
          Don't just take my word for it. Here's what others have to say about
          working with me.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
            image={testimonial.image}
          />
        ))}
      </div>
    </div>
  );
};
