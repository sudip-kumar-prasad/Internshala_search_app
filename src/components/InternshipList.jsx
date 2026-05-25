import React, { memo } from 'react';
import {
  FiMapPin,
  FiPlayCircle,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiExternalLink,
  FiChevronRight,
  FiArrowRight,
} from 'react-icons/fi';
import { useFilters } from '../context/FilterContext';

// Authentic Logo component with automatic fallback
const CompanyLogo = ({ logoName, companyName }) => {
  const [hasError, setHasError] = React.useState(false);

  const fallbackLetter = companyName ? companyName.charAt(0).toUpperCase() : 'I';

  if (!logoName || hasError) {
    return <div className="card-logo-placeholder">{fallbackLetter}</div>;
  }

  return (
    <img
      src={`https://internshala.com/uploads/logo/${logoName}`}
      alt={`${companyName} logo`}
      className="card-logo"
      onError={() => setHasError(true)}
    />
  );
};

// Premium Internship Card component matching Internshala high fidelity
const InternshipCard = memo(({ internship }) => {
  const {
    title,
    company_name,
    work_from_home,
    location_names,
    duration,
    stipend,
    start_date,
    posted_by_label,
    is_ppo,
    ppo_label_value,
    part_time,
  } = internship;

  const displayLocation = work_from_home
    ? 'Work From Home'
    : location_names && location_names.length > 0
    ? location_names.join(', ')
    : 'India';

  const stipendText = stipend ? stipend.salary : '₹ Unspecified';

  return (
    <div className="internship-card">
      <div className="card-top">
        <div className="card-info">
          {/* Actively Hiring Badge */}
          <div style={{ marginBottom: '8px' }}>
            <span className="actively-hiring">Actively hiring</span>
          </div>

          <h3 className="card-title">{title || 'Untitled Internship'}</h3>
          <div className="card-company">
            <span>{company_name || 'Confidential Company'}</span>
          </div>
        </div>

        {/* Company Logo / Placeholder */}
        <CompanyLogo logoName={internship.company_logo} companyName={company_name} />
      </div>

      {/* Meta details: Location, Start Date, Duration, Stipend */}
      <div className="card-meta">
        <div className="card-meta-item">
          <FiMapPin />
          <span>{displayLocation}</span>
        </div>
        <div className="card-meta-item">
          <FiPlayCircle />
          <span>{start_date || 'Starts Immediately'}</span>
        </div>
        <div className="card-meta-item">
          <FiCalendar />
          <span>{duration || 'Duration Unspecified'}</span>
        </div>
        <div className="card-meta-item">
          <FiDollarSign />
          <span>{stipendText}</span>
        </div>
      </div>

      {/* Tags like PPO or Part Time */}
      <div className="card-tags">
        <span className="card-tag">Internship</span>
        {part_time && <span className="card-tag">Part-time</span>}
        {is_ppo && <span className="card-tag">Job Offer (PPO)</span>}
      </div>

      {/* Footer info: Posted date, PPO text badge, View details button */}
      <div className="card-footer">
        <div className="card-time">
          <FiClock />
          <span>{posted_by_label || 'Just posted'}</span>
        </div>

        {ppo_label_value && (
          <div className="card-badge">
            <span>{ppo_label_value}</span>
          </div>
        )}

        <div style={{ marginLeft: 'auto' }}>
          <button
            type="button"
            className="enroll-btn"
            style={{ color: '#008BDC', gap: '4px' }}
          >
            <span>View details</span>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
});

// An authentic promo training card embedded naturally inside the search results
const PromoCard = () => {
  return (
    <div className="promo-card">
      <div className="promo-content">
        <span className="offer-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>
          SPECIAL OFFER
        </span>
        <h3>Learn Placement-Guaranteed Skills!</h3>
        <p>Get Certified in Web Development, Data Science, Digital Marketing and more at 80% OFF.</p>
        <div className="promo-meta">
          <span className="promo-coupon">Use Coupon: <strong style={{ color: '#ff7043' }}>GROW80</strong></span>
          <span className="promo-timer">• Offer valid for 24 hours</span>
        </div>
        <div className="promo-cert">
          <span>* Accredited certificates accepted by 100,000+ top brands.</span>
        </div>
      </div>
      <div className="promo-right">
        <button
          type="button"
          className="enroll-btn"
          style={{
            background: 'linear-gradient(135deg, #008BDC, #005a9c)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Explore Trainings</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

const InternshipList = ({ internships }) => {
  const { clearAllFilters } = useFilters();

  if (!internships || internships.length === 0) {
    return (
      <div className="internship-list">
        <div className="empty-state">
          <h3>No matching internships found</h3>
          <p style={{ marginBottom: '20px' }}>
            Try adjusting your search query, location, or stipend filters.
          </p>
          <button
            type="button"
            className="enroll-btn"
            onClick={clearAllFilters}
            style={{
              margin: '0 auto',
              background: '#083d77',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="internship-list">
      {internships.map((internship, index) => {
        // Embed a nice promo training card after the second card for high fidelity
        if (index === 2) {
          return (
            <React.Fragment key="promo-key">
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

