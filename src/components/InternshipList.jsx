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

// Authentic Logo component with building placeholder fallback
const CompanyLogo = ({ logoName, companyName }) => {
  const [imageError, setImageError] = useState(false);

  if (logoName && !imageError) {
    return (
      <div className="card-logo-container">
        <img
          src={`https://internshala.com/uploads/logo/${logoName}`}
          alt={`${companyName} logo`}
          className="card-logo-img"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="card-logo-container"
      style={{ backgroundColor: '#FCFCFC', borderColor: '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        style={{ width: '26px', height: '26px', fill: '#9E9E9E' }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
      </svg>
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


