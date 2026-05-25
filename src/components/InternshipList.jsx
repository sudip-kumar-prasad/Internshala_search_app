import React, { memo, useState, useEffect } from 'react';
import {
  FiHome,
  FiPlay,
  FiCalendar,
  FiFileText,
  FiClock,
  FiZap,
  FiChevronRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { useFilters } from '../context/FilterContext';

// Authentic Logo component with colorized fallback circle
const CompanyLogo = ({ logoName, companyName }) => {
  const fallbackLetter = companyName ? companyName.charAt(0).toUpperCase() : 'I';

  if (logoName) {
    return (
      <div className="card-logo-container">
        <img
          src={`https://internshala.com/uploads/logo/${logoName}`}
          alt={`${companyName} logo`}
          className="card-logo-img"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Soft palette colors for letter logo avatars
  const colors = [
    { bg: '#e2f0d9', border: '#c5e0b4', color: '#385723' },
    { bg: '#fff3cd', border: '#ffe8a1', color: '#856404' },
    { bg: '#fce4ec', border: '#f8bbd0', color: '#c2185b' },
    { bg: '#e8f0fe', border: '#d2e3fc', color: '#1a73e8' },
  ];
  const colorIndex = companyName ? companyName.charCodeAt(0) % colors.length : 0;
  const { bg, border, color } = colors[colorIndex];

  return (
    <div
      className="card-logo-container"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <span className="card-logo-letter" style={{ color }}>
        {fallbackLetter}
      </span>
    </div>
  );
};

// Premium Internship Card matching Internshala's exact screenshot layout
const InternshipCard = memo(({ internship }) => {
  const {
    title,
    company_name,
    work_from_home,
    location_names,
    duration,
    stipend,
    posted_by_label,
    is_ppo,
    ppo_label_value,
    part_time,
    description,
    skills,
  } = internship;

  const displayLocation = work_from_home
    ? 'Work from home'
    : location_names && location_names.length > 0
    ? location_names.join(', ')
    : 'India';

  const stipendText = stipend ? stipend.salary : 'Unpaid';

  return (
    <div className="internship-card">
      <div className="card-header">
        <div className="card-title-group">
          <h3 className="card-job-title">{title || 'Untitled Internship'}</h3>
          <div className="card-company-row">
            <span className="card-company-name">{company_name || 'Confidential'}</span>
            <span className="card-badge-active">Actively hiring</span>
          </div>
        </div>

        {/* Circular Company Logo / Fallback */}
        <CompanyLogo logoName={internship.company_logo} companyName={company_name} />
      </div>

      {/* Meta details: Home icon, Money icon, Calendar icon */}
      <div className="card-details-row">
        <div className="card-detail-item">
          <FiHome />
          <span>{displayLocation}</span>
        </div>
        <div className="card-detail-item">
          <FiPlay style={{ transform: 'rotate(90deg)' }} />
          <span>{stipendText}</span>
        </div>
        <div className="card-detail-item">
          <FiCalendar />
          <span>{duration || '1 Month'}</span>
        </div>
      </div>

      {/* Responsibilities line with Clipboard/Document icon */}
      {description && (
        <div className="card-description-row">
          <FiFileText />
          <span>{description}</span>
        </div>
      )}

      {/* Skills tags list */}
      {skills && skills.length > 0 && (
        <div className="card-skills-row">
          {skills.map((skill, index) => (
            <span key={index} className="card-skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer tags line */}
      <div className="card-footer">
        <div className="card-footer-badge green">
          <FiClock />
          <span>{posted_by_label || 'Few hours ago'}</span>
        </div>

        {is_ppo && (
          <div className="card-footer-badge orange">
            <FiCheckCircle />
            <span>{ppo_label_value || 'Job offer post internship'}</span>
          </div>
        )}

        {part_time && (
          <span className="card-footer-text" style={{ marginLeft: '4px' }}>
            • Part time
          </span>
        )}
      </div>
    </div>
  );
});

// Authentic ticking promo training card matching the screenshot
const PromoCard = () => {
  const [seconds, setSeconds] = useState(131); // 2m 11s

  useEffect(() => {
    if (seconds <= 0) return;
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);

  const formatTime = (totalSecs) => {
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `${hrs}h: ${mins}m: ${secs}s`;
  };

  return (
    <div className="promo-card">
      <span className="promo-tag-offer">OFFER</span>
      <h3 className="promo-title">Get Internship and Job Preparation training FREE!</h3>
      <p className="promo-subtitle">By enrolling in trainings at 55% + 10% OFF!</p>

      <div className="promo-details-row">
        <div className="promo-detail-item">
          <FiZap />
          <span>
            Use coupon: <strong>GD10</strong>
          </span>
        </div>
        <div className="promo-detail-item">
          <FiClock />
          <span>Offer ends in {formatTime(seconds)}</span>
        </div>
      </div>

      <div className="promo-recommendation">
        Course recommended for SUDIP KUMAR:{' '}
        <strong style={{ color: '#008BDC' }}>Full Stack Web Development with AI</strong>
      </div>

      <div className="promo-footer">
        <span className="promo-badge-certified">Government Certified Trainings</span>
        <a href="#enroll" className="promo-btn-enroll" onClick={(e) => e.preventDefault()}>
          <span>Enroll now</span>
          <FiChevronRight />
        </a>
      </div>
    </div>
  );
};

const InternshipList = ({ internships }) => {
  const { clearAllFilters } = useFilters();

  if (!internships || internships.length === 0) {
    return (
      <div className="listings-container">
        <div className="empty-state">
          <h3>No internships found</h3>
          <p>Try adjusting your profile keyword, location, or monthly stipend slider.</p>
          <button type="button" className="empty-state-btn" onClick={clearAllFilters}>
            Clear all filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="listings-container">
      {internships.map((internship, index) => {
        // Embed the ticking training promo card after the first card to match screenshot perfectly!
        if (index === 0) {
          return (
            <React.Fragment key="promo-wrapper-key">
              <PromoCard />
              <InternshipCard internship={internship} />
            </React.Fragment>
          );
        }
        return <InternshipCard key={internship.id} internship={internship} />;
      })}
    </div>
  );
};

export default memo(InternshipList);


