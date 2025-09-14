import React, { useState, useEffect } from "react";
import "../styles/privacy.css";
import { Link } from "react-router-dom";
const Privacy = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const privacySections = [
    {
      id: "information-collection",
      icon: "👁️",
      title: "Information Collection",
      content: "We collect information when you:",
      items: [
        "Register on our platform",
        "Use interactive features",
        "Contact us for support",
      ],
    },
    {
      id: "use-of-information",
      icon: "📋",
      title: "Use of Information",
      content: "We use collected information to:",
      items: [
        "Provide and improve services",
        "Personalize your experience",
        "Respond to inquiries",
      ],
    },
    {
      id: "data-protection",
      icon: "🔒",
      title: "Data Protection",
      content: "Security measures include:",
      items: [
        "Encryption of sensitive data",
        "Regular security audits",
        "Limited access to information",
      ],
    },
    {
      id: "third-party-services",
      icon: "👥",
      title: "Third-Party Services",
      content: "We may use services like Google Analytics for usage tracking.",
    },
    {
      id: "your-rights",
      icon: "✅",
      title: "Your Rights",
      content: "You can request to:",
      items: [
        "Access your personal data",
        "Correct information",
        "Delete your account",
      ],
    },
  ];

  return (
    <div className="privacy-policy-container">
      <div className="privacy-content">
        <div className="privacy-hero">
          <div className="hero-icon">
            <h1 className="hero-title">
              <span>🛡️</span>Privacy Policy
            </h1>
          </div>
          <div className="last-updated">
            <span className="status-dot"></span>
            Last Updated: August 13th, 2025
          </div>
          <p className="hero-description">
            How we collect, use, and protect your information.
          </p>
        </div>

        <div className="privacy-sections">
          {privacySections.map((section, index) => (
            <section
              key={section.id}
              className="privacy-section"
              id={section.id}
            >
              <div className="section-header">
                <div className="section-icon">
                  <span>{section.icon}</span>
                </div>
                <h2 className="section-title">
                  {index + 1}. {section.title}
                </h2>
              </div>

              <div className="section-content">
                <p className="section-description">{section.content}</p>

                {section.items && (
                  <ul className="privacy-list">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="privacy-list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="contact-section">
          <div className="contact-content">
            <h3 className="contact-title">Questions About Privacy?</h3>
            <button className="contact-button">
              <Link to="/contact">Contact Support</Link>{" "}
            </button>
          </div>
        </div>

        <footer className="privacy-footer">
          <p>© 2025 Algorithm Visualization Platform</p>
        </footer>
      </div>
    </div>
  );
};

export default Privacy;
