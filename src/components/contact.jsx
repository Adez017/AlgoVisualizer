import React from "react";
import "../styles/contact.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane, FaUsers, FaLightbulb, FaCode } from 'react-icons/fa';
// Import the FaqChatbot component you provided
import FaqChatbot from './FaqChatbot';

export default function Contact() {
    return (
        <div className="contact">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="gradient-text">Get In Touch</span>
                    </h1>
                    <p className="hero-subtitle">
                        Ready to visualize your learning journey? Let's connect!
                    </p>
                </div>
                <div className="floating-elements">
                    <div className="floating-icon icon-1"><FaCode /></div>
                    <div className="floating-icon icon-2"><FaLightbulb /></div>
                    <div className="floating-icon icon-3"><FaUsers /></div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="mission-section">
                <div className="mission-card">
                    <div className="mission-icon">
                        <FaLightbulb />
                    </div>
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p>
                            AlgoVisualizer is more than just a tool—it's a bridge between abstract algorithms 
                            and intuitive understanding. Whether you're a student struggling with sorting concepts, 
                            a developer prepping for interviews, or an educator seeking dynamic teaching aids, 
                            we're here to help.
                        </p>
                        <div className="mission-tagline">
                            <span className="tagline-text">Visualizing Algorithms, Simplifying Learning</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <div className="form-header">
                        <h3>Let's Start a Conversation</h3>
                        <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
                    </div>
                    
                    <form className="contact-form">
                        <div className="form-grid">
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    placeholder="Enter your name" 
                                    required
                                />
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    placeholder="Enter your email" 
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="input-group full-width">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message"
                                placeholder="Tell us about your project, questions, or how we can help..."
                                rows="6"
                                required
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="submit-btn">
                            <FaPaperPlane />
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Social Links Section */}
            <div className="social-section">
                <div className="social-container">
                    <h4>Connect With Us</h4>
                    <div className="social-grid">
                        <a href="https://github.com/RhythmPahwa14/AlgoVisualizer" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="social-card github">
                            <div className="social-icon">
                                <FaGithub />
                            </div>
                            <div className="social-info">
                                <h5>GitHub</h5>
                                <span>View our code</span>
                            </div>
                        </a>
                        
                        <a href="https://www.linkedin.com/in/pahwa-rhythm/" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="social-card linkedin">
                            <div className="social-icon">
                                <FaLinkedin />
                            </div>
                            <div className="social-info">
                                <h5>LinkedIn</h5>
                                <span>Professional network</span>
                            </div>
                        </a>
                        
                        <a href="https://twitter.com" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="social-card twitter">
                            <div className="social-icon">
                                <FaTwitter />
                            </div>
                            <div className="social-info">
                                <h5>Twitter</h5>
                                <span>Latest updates</span>
                            </div>
                        </a>
                        
                        <a href="mailto:contact@algovisualizer.com" 
                           className="social-card email">
                            <div className="social-icon">
                                <FaEnvelope />
                            </div>
                            <div className="social-info">
                                <h5>Email</h5>
                                <span>Direct contact</span>
                            </div>
                        </a>
                    </div>
                    
                    <div className="response-note">
                        <p>
                            <strong>Quick Response Promise:</strong> We typically respond within 24 hours. 
                            For urgent inquiries, feel free to reach out directly through our social channels!
                        </p>
                    </div>
                </div>
            </div>
            
            {/* FAQ Chatbot */}
            <div className="chatbot-section">
                <FaqChatbot />
            </div>
        </div>
    );
}