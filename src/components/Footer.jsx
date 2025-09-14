import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
  FaCode,
  FaGraduationCap,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/footer.css";
import logo from "/public/logo.jpg"

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error("Subscription service temporarily unavailable"));
          }
        }, 1500);
      });

      setIsSubscribed(true);
      toast.success("🎉 Successfully subscribed to our newsletter!");
      setEmail("");

      setTimeout(() => {
        toast.info("📧 Welcome email sent! Check your inbox.");
      }, 1000);
    } catch (error) {
      toast.error("❌ " + error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSubscribed(false), 8000);
    }
  };

  return (
    <>
      <footer className={`footer-container ${isVisible ? "visible" : ""}`}>
        <div className="footer-wave">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-column brand-column">
            <div className="brand-header">
              <div className="logo-wrapper">
  <img src={logo} alt="AlgoVisualizer Logo" className="logo-image" />
  <span className="logo-text">AlgoVisualizer</span>
</div>
              <p className="brand-tagline">
                Visualize algorithms. Master coding. Elevate skills.
              </p>
            </div>

            <div className="tech-pills">
              <span className="tech-pill">React</span>
              <span className="tech-pill">JavaScript</span>
              <span className="tech-pill">D3.js</span>
              <span className="tech-pill">Node.js</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column links-column">
            <h3 className="column-title">Navigate</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">
                  <FaArrowRight className="link-icon" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/algorithms">
                  <FaArrowRight className="link-icon" />
                  Algorithms
                </Link>
              </li>
              <li>
                <Link to="/data-structures">
                  <FaArrowRight className="link-icon" />
                  Data Structures
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FaArrowRight className="link-icon" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FaArrowRight className="link-icon" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column resources-column">
            <h3 className="column-title">Resources</h3>
            <ul className="footer-links">
              <li>
                <Link to="/documentation">
                  <FaArrowRight className="link-icon" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/data-structures">
                  <FaArrowRight className="link-icon" />
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <FaArrowRight className="link-icon" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contributors">
                  <FaArrowRight className="link-icon" />
                  Community
                </Link>
              </li>
              <li>
                <Link to="/contribute">
                  <FaArrowRight className="link-icon" />
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column newsletter-column">
            <h3 className="column-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest algorithm visualizations and coding insights
              delivered to your inbox.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-container">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className={`newsletter-btn ${isLoading ? "loading" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="btn-spinner"></div>
                  ) : (
                    <>
                      Subscribe <FaArrowRight className="btn-icon" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="subscription-success">
                <div className="success-checkmark">
                  <div className="check-icon"></div>
                </div>
                <h4>You're subscribed!</h4>
                <p>Look out for our updates in your inbox.</p>
              </div>
            )}

            <div className="social-links">
              <a
                href="https://github.com/RhythmPahwa14/AlgoVisualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/sandeepvashishtha"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaLinkedin />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaDiscord />
              </a>
              <a href="#" className="social-link">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="bottom-content">
            <div className="copyright">
              <p>
                &copy; {new Date().getFullYear()} AlgoVisualizer. All rights
                reserved.
              </p>
            </div>

            <div className="footer-credits">
              <p>
                Made with <FaHeart className="heart-icon" /> by
                <a
                  href="https://github.com/rhythmpahwa14"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Rhythm Pahwa
                </a>{" "}
                &
                <a
                  href="https://github.com/sandeepvashishtha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Sandeep Vashishtha
                </a>
              </p>
            </div>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Footer;
