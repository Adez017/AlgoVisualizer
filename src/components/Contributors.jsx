// cspell:words sandeepvashishtha Vashishtha rhythmpahwa Pahwa noopener noreferrer
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import "../styles/global-theme.css";

// Mock contributors data - moved outside component to avoid useEffect dependency issues
const mockContributors = [
  {
    id: 1,
    login: 'sandeepvashishtha',
    name: 'Sandeep Vashishtha',
    avatar_url: '/avatars/sandeep-avatar.svg',
    html_url: 'https://github.com/sandeepvashishtha',
    contributions: 125,
    role: 'Project Lead & Full Stack Developer',
    bio: 'Passionate about building scalable algorithm visualization applications and educational tools.'
  },
  {
    id: 2,
    login: 'rhythmpahwa14',
    name: 'Rhythm Pahwa',
    avatar_url: '/avatars/rhythm-avatar.svg',
    html_url: 'https://github.com/rhythmpahwa14',
    contributions: 50,
    role: 'Senior Contributor & Developer',
    bio: 'Experienced developer contributing to algorithm visualization and educational technology projects.'
  }
];

// Helper function to assign roles based on GitHub activity and profile
const getRoleByGitHubActivity = (contributor) => {
  const { 
    contributions, 
    followers = 0, 
    public_repos = 0, 
    created_at,
    login 
  } = contributor;
  
  // Special role for project owner
  if (login === 'sandeepvashishtha') return 'Project Lead & Full Stack Developer';

  // Calculate account age in years
  const accountAge = created_at ? 
    (new Date() - new Date(created_at)) / (1000 * 60 * 60 * 24 * 365) : 0;
  
  // Advanced role assignment based on multiple factors
  if (contributions > 100 && followers > 50 && public_repos > 20) {
    return 'Core Maintainer';
  }
  
  if (contributions > 50 && (followers > 20 || public_repos > 10)) {
    return 'Senior Open Source Developer';
  }
  
  if (public_repos > 20 && contributions > 20) {
    return 'Open Source Advocate';
  }
  
  if (contributions > 50 && accountAge > 2) {
    return 'Veteran Developer';
  }
  
  if (contributions > 30 && followers > 10) {
    return 'Community Leader';
  }
  
  if (contributions > 20) {
    return 'Active Developer';
  }
  
  if (contributions > 10) {
    return 'Regular Contributor';
  }
  
  if (contributions > 5) {
    return 'Contributing Member';
  }
  
  return 'New Contributor';
};

// Animated Counter Component for dynamic commit badge
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(value);
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={countRef} className="contribution-count">
      {count}
    </span>
  );
};

// Helper function to get contributor type class
const getContributorTypeClass = (contributions) => {
  if (contributions > 100) return 'core-maintainer';
  if (contributions > 50) return 'active-developer';
  return 'regular-contributor';
};

// Helper function to get activity level class
const getActivityLevelClass = (contributions) => {
  if (contributions > 50) return 'high-activity';
  if (contributions > 20) return 'medium-activity';
  return 'low-activity';
};

// Helper function to get commit badge class based on specified ranges
const getCommitBadgeClass = (contributions) => {
  if (contributions >= 200) return 'high-commits'; // Gold for 200+
  if (contributions >= 51) return 'medium-commits'; // Green for 51-200
  if (contributions >= 10) return 'low-commits'; // Blue for 10-50
  return 'very-low-commits'; // Gray for under 10
};

// Helper function to get role badge info
const getRoleBadgeInfo = (role, contributions) => {
  if (role.includes('Lead') || role.includes('Maintainer')) {
    return { icon: '👑', class: 'maintainer' };
  }
  if (role.includes('Senior') || contributions > 50) {
    return { icon: '⭐', class: 'mentor' };
  }
  return null;
};

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastCommitSha, setLastCommitSha] = useState(null);

  // Function to get the latest commit SHA
  const getLatestCommitSha = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer/commits?per_page=1');
      if (response.ok) {
        const commits = await response.json();
        return commits.length > 0 ? commits[0].sha : null;
      }
    } catch (error) {
      console.error('Error fetching latest commit:', error);
    }
    return null;
  };

  // Function to fetch additional GitHub profile data
  const fetchGitHubProfile = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const profile = await response.json();
        return {
          followers: profile.followers || 0,
          public_repos: profile.public_repos || 0,
          created_at: profile.created_at,
          name: profile.name || username,
          bio: profile.bio || `Dedicated contributor with expertise in software development.`
        };
      }
    } catch (error) {
      console.error(`Error fetching profile for ${username}:`, error);
    }
    return {
      followers: 0,
      public_repos: 0,
      created_at: null,
      name: username,
      bio: `Dedicated contributor with expertise in software development.`
    };
  };

  // Function to fetch contributors
  const fetchContributors = useCallback(async () => {
    try {
      setLoading(true);
      
      // Try to fetch real contributors from GitHub API
      try {
        const response = await fetch('https://api.github.com/repos/RhythmPahwa14/AlgoVisualizer/contributors');
        if (response.ok) {
          const githubContributors = await response.json();
          
          // Enhance GitHub data with additional profile info
          const enhancedContributors = await Promise.all(
            githubContributors.map(async (contributor) => {
              const profileData = await fetchGitHubProfile(contributor.login);

              // Determine bio without nested ternaries (readability)
              let bio = profileData.bio;
              if (contributor.login === 'rhythmpahwa14') {
                bio = 'Passionate about building scalable algorithm visualization applications and educational tools.';
              } else if (contributor.login === 'sandeepvashishtha') {
                bio = 'Experienced developer contributing to algorithm visualization and educational technology projects.';
              }

              const enhancedContributor = {
                ...contributor,
                ...profileData,
                id: contributor.id,
                role: getRoleByGitHubActivity({
                  ...contributor,
                  ...profileData
                }),
                bio
              };

              return enhancedContributor;
            })
          );
          setContributors(enhancedContributors);
        } else {
          throw new Error('GitHub API request failed');
        }
      } catch (apiError) {
        console.warn('GitHub API not available, using mock data', apiError);
        setContributors(mockContributors);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contributors:', error);
      setContributors(mockContributors);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    const initializeData = async () => {
      await fetchContributors();
      const initialSha = await getLatestCommitSha();
      setLastCommitSha(initialSha);
    };
    
    initializeData();

    // Set up polling for new commits every 30 seconds
    const commitCheckInterval = setInterval(async () => {
      const latestSha = await getLatestCommitSha();
      
      if (latestSha && lastCommitSha && latestSha !== lastCommitSha) {
        console.log('New commit detected, refreshing contributors...');
        await fetchContributors();
        setLastCommitSha(latestSha);
      } else if (latestSha && !lastCommitSha) {
        setLastCommitSha(latestSha);
      }
    }, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(commitCheckInterval);
  }, [lastCommitSha, fetchContributors]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="theme-container">
        <div className="loading-state">
          <motion.div
            className="bouncing-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader-dot" />
            <div className="loader-dot" />
            <div className="loader-dot" />
          </motion.div>
          <p>Loading our amazing contributors...</p>
        </div>
      </div>
    );
  }



  return (
    // ✅ MODIFIED: The main container now uses our global theme class.
    <div className="theme-container">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* ✅ MODIFIED: The header now uses our global theme class. */}
        <h1 className="theme-title">Our Amazing Contributors</h1>
        <p className="contributors-header subtitle">Building Together, Growing Together</p>
      </motion.div>

      {/* ✅ MODIFIED: The grid now uses our new global class. */}
      <motion.div
        className="contributors-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {contributors.map((contributor) => {
          const contributorTypeClass = getContributorTypeClass(contributor.contributions);
          const activityLevelClass = getActivityLevelClass(contributor.contributions);
          const commitBadgeClass = getCommitBadgeClass(contributor.contributions);
          const roleBadgeInfo = getRoleBadgeInfo(contributor.role, contributor.contributions);
          
          return (
            // ✅ MODIFIED: The card now uses our new enhanced classes.
            <motion.div
              key={contributor.id}
              className={`contributor-card ${contributorTypeClass} ${activityLevelClass}`}
              variants={itemVariants}
            >
              <div className="card-glow"></div>
              <div className="contributor-avatar">
                <div className="avatar-ring"></div>
                <img
                  src={contributor.avatar_url}
                  alt={contributor.name || contributor.login}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${contributor.name || contributor.login}&background=6366f1&color=ffffff&size=120`;
                  }}
                />
                {roleBadgeInfo && (
                  <div className={`role-badge ${roleBadgeInfo.class}`}>
                    {roleBadgeInfo.icon}
                  </div>
                )}
                <div className={`contribution-badge ${commitBadgeClass}`}>
                  <AnimatedCounter value={contributor.contributions} />
                  <span className="contribution-label">commits</span>
                </div>
              </div>
              
              {/* ✅ MODIFIED: All child elements now use our new enhanced classes. */}
              <div className="contributor-info">
                <h3 className="contributor-name">{contributor.name || contributor.login}</h3>
                <p className="contributor-role">{contributor.role}</p>
                <p className="contributor-bio">{contributor.bio}</p>
                
                {/* Enhanced contribution stats */}
                <div className="contribution-stats">
                  <div className="stat-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="stat-value">{contributor.contributions}</span>
                    <span>PRs</span>
                  </div>
                  <div className="stat-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="stat-value">{Math.floor(contributor.contributions * 0.3)}</span>
                    <span>Issues</span>
                  </div>
                  <div className="stat-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
                    </svg>
                    <span className="stat-value">{Math.floor(contributor.contributions * 0.5)}</span>
                    <span>Reviews</span>
                  </div>
                </div>
                
                <div className="contributor-links">
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Profile
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ✅ REFACTORED: The CTA is now a standard theme-card */}
      <motion.div
        className="theme-card"
        style={{ textAlign: 'center' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="theme-card-header">Join Our Community</h3>
        <p style={{ color: "var(--theme-text-secondary)", maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Want to contribute to AlgoVisualizer? We welcome developers of all skill levels! 
          Help us improve algorithm education and build amazing visualizations together.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/RhythmPahwa14/AlgoVisualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary" // ✅ MODIFIED
          >
            Contribute on GitHub
          </a>
          <a
            href="https://github.com/RhythmPahwa14/AlgoVisualizer/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary" // ✅ MODIFIED
          >
            Report Issues
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Contributors;