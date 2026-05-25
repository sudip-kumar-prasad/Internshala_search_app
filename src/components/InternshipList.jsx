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

// Authentic Logo component with custom branding and building fallback
const CompanyLogo = ({ logoName, companyName }) => {
  const [imageError, setImageError] = useState(false);

  // Render high fidelity custom SVG logo depending on company name for replication realism
  if (companyName === "Emoolar Technology Private Limited") {
    return (
      <div className="card-logo-container" style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="34" height="34" viewBox="0 0 100 100">
          {/* Cursive, elegant lowercase e mimicking the handwriting logo */}
          <path d="M70,40 C70,30 62,22 50,22 C32,22 24,40 24,56 C24,72 35,80 50,80 C68,80 76,60 76,54 L68,54 C68,58 62,72 50,72 C40,72 34,66 34,56 C34,46 42,30 50,30 C58,30 62,36 62,44 C62,48 58,50 42,50 C44,60 52,62 60,62 C66,62 70,58 70,54 Z M42,42 C50,42 54,42 54,38 C54,34 50,30 46,30 C42,30 42,38 42,42 Z" fill="#000000" />
        </svg>
      </div>
    );
  }

  if (companyName === "Primetrade.ai") {
    return (
      <div className="card-logo-container" style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield logo with geometric PT letters */}
          <path d="M50 12 L82 26 V58 C82 72 68 84 50 88 C32 84 18 72 18 58 V26 L50 12 Z" fill="#1C3D5A" />
          <path d="M50 18 L76 30 V54 C76 66 64 76 50 80 C36 76 24 66 24 54 V30 L50 18 Z" fill="#008BDC" />
          <text x="50" y="56" fontFamily="'Inter', sans-serif" fontSize="22" fontWeight="900" fill="#FFFFFF" textAnchor="middle">PT</text>
        </svg>
      </div>
    );
  }

  if (companyName === "NayePankh Foundation") {
    return (
      <div className="card-logo-container" style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wing/Feather abstract logo */}
          <circle cx="50" cy="50" r="42" fill="#E8F5E9" />
          <path d="M50 20 C65 20 75 35 75 50 C75 65 65 80 50 80 C35 80 25 65 25 50 C25 35 35 20 50 20 Z" fill="#81C784" />
          <path d="M50 30 C58 30 65 40 65 50 C65 60 58 70 50 70 C42 70 35 60 35 50 C35 40 42 30 50 30 Z" fill="#2E7D32" />
          <circle cx="50" cy="50" r="8" fill="#FFF" />
        </svg>
      </div>
    );
  }

  if (companyName === "Basti Ki Pathshala Foundation") {
    return (
      <div className="card-logo-container" style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Graduation cap / NGO education logo */}
          <circle cx="50" cy="50" r="42" fill="#E3F2FD" />
          <path d="M50 25 L80 40 L50 55 L20 40 L50 25 Z" fill="#1565C0" />
          <path d="M30 46 V64 C30 70 40 75 50 75 C60 75 70 70 70 64 V46" fill="none" stroke="#1565C0" strokeWidth="6" />
          <path d="M80 40 V65" fill="none" stroke="#FFB300" strokeWidth="4" />
          <circle cx="80" cy="65" r="5" fill="#FFB300" />
        </svg>
      </div>
    );
  }

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

// Promoted course card matching the screenshot layout
const PromoCard = () => {
  return (
    <div className="promo-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#212529', margin: 0 }}>
          Get hired for Web Development <span style={{ color: '#888888', fontWeight: '400', fontSize: '13px', marginLeft: '4px' }}>• Promoted</span>
        </h3>
      </div>
      
      <div style={{ display: 'inline-block', backgroundColor: '#FFF3CD', border: '1px solid #FFE8A1', color: '#856404', fontSize: '11px', fontWeight: '600', padding: '3.5px 10px', borderRadius: '4px', marginBottom: '15px' }}>
        Online Course with Placement Assistance
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555555' }}>
          <FiZap style={{ color: '#ffb300', strokeWidth: '2.5' }} />
          <span>Upskill & stand out as <strong>top applicant</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555555' }}>
          <FiFileText style={{ color: '#008BDC' }} />
          <span>Get <strong>priority access</strong> to top opportunities</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555555' }}>
          <FiZap style={{ color: '#2e7d32' }} />
          <span><strong>Role specific</strong> Unlimited mock AI interviews</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f3f5', paddingTop: '12px' }}>
        <a href="#enroll" className="promo-btn-enroll" style={{ color: '#008BDC', fontSize: '13.5px', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.preventDefault()}>
          <span>Apply now</span>
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


