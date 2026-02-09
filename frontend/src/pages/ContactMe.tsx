import React, { useState } from 'react';
import '../styles/contact.scss';
import { Nav } from '../components/nav';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await fetch('https://formspree.io/f/xovkagwq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            First_name: formData.firstName,
            Last_name: formData.lastName,
            Email: formData.email,
            Message: formData.message,
          }),
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
          });

          // Reset success message after 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="contact">
      <div className="left-wrapper">
        <h1>Contact Me</h1>
        <p>
          Interested in working with me? Fill out some info and I'll be in touch
          shortly. Can't wait to hear from you!
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <i className="bx bx-envelope"></i>
            <span>natejsx@gmail.com</span>
          </div>
          <div className="contact-item">
            <i className="bx bxl-instagram"></i>
            <span>@nate.jsx</span>
          </div>
          <div className="contact-item">
            <i className="bx bx-map"></i>
            <span>Houston, TX</span>
          </div>
        </div>
      </div>
      <div className="right-wrapper">
        {submitSuccess && (
          <div className="success-message">
            <i className="bx bx-check-circle"></i>
            <p>Thank you for your message! I'll get back to you soon.</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="name-wrapper">
            <label htmlFor="firstName" className="first-name">
              First Name
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </label>
            <label htmlFor="lastName" className="last-name">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </label>
          </div>
          <label htmlFor="email" className="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@something.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </label>

          <label htmlFor="message" className="message">
            Message
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message..."
              required
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
            ></textarea>
            {errors.message && (
              <span className="error-message">{errors.message}</span>
            )}
          </label>

          <button type="submit" className="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

const ContactMe = () => {
  return (
    <section className="contact-container">
      <Nav />
      <ContactForm />
    </section>
  );
};

export default ContactMe;
