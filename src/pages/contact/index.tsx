import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import styles from '../../styles/Contact.module.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
      `;

      window.location.href = `mailto:batraaryan03@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.contactContainer}>
        <div className={styles.contactBackground}>
          <div className={styles.contactOverlay}></div>
        </div>
        
        <div className={styles.contactContent}>
          <div className={styles.contactHeader}>
            <h1 className={styles.contactTitle}>Get in Touch</h1>
            <p className={styles.contactSubtitle}>
              We'd love to hear from you. Whether you have questions, feedback, or just want to say hello.
            </p>
          </div>

          <div className={styles.contactFormContainer}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="John Doe"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="john@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="How can we help?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={styles.formTextarea}
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>

            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Email Us Directly</h3>
                <p className={styles.infoText}>
                  For urgent matters, you can reach us through our contact form.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Response Time</h3>
                <p className={styles.infoText}>
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Important Note</h3>
                <p className={styles.infoText}>
                  TrueMate is a counseling platform that facilitates connections. 
                  Users are responsible for their interactions and any relationships formed. 
                  We do not take responsibility for user actions or outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
