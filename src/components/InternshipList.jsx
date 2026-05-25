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

  if (companyName === "X1 Race LLP") {
    return (
      <div className="card-logo-container" style={{ borderColor: '#E0E0E0', backgroundColor: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px' }}>
        <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized Red X and White 1 racing logo */}
          <path d="M20 20 L45 50 L20 80 H35 L52 59 L70 80 H85 L60 50 L85 20 H70 L52 41 L35 20 H20 Z" fill="#E60000" />
          <rect x="47" y="30" width="10" height="40" fill="#FFFFFF" transform="rotate(15 52 50)" />
          <text x="50" y="85" fontFamily="'Inter', 'Arial Black', sans-serif" fontSize="10" fontWeight="900" fill="#E60000" textAnchor="middle" letterSpacing="0.5">RACING</text>
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
    start_date,
    application_deadline,
  } = internship;

  const displayLocation = work_from_home
    ? 'Work from home'
    : location_names && location_names.length > 0
    ? location_names.join(', ')
    : 'India';

  const stipendText = stipend ? stipend.salary : 'Unpaid';

  return (
    <div className="internship-card">
      {/* Header section with Title, Company and Logo */}
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <div className="card-title-group">
          <h3 className="card-job-title" style={{ fontSize: '15.5px', fontWeight: '600', color: '#212529', marginBottom: '4px' }}>
            {title || 'Untitled Internship'}
          </h3>
          <div className="card-company-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="card-company-name" style={{ fontSize: '13.5px', color: '#666666', fontWeight: '500' }}>
              {company_name || 'Confidential'}
            </span>
            <span className="card-badge-active" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', padding: '1.5px 6px', borderRadius: '4px', backgroundColor: '#F0F8FF', border: '1px solid #D6E8F7', color: '#008BDC', fontWeight: '500' }}>
              <svg style={{ width: '10px', height: '10px', fill: 'none', stroke: '#008BDC', strokeWidth: '2.5' }} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Actively hiring
            </span>
          </div>
        </div>

        {/* Company Logo Rounded Square Fallback */}
        <CompanyLogo logoName={internship.company_logo} companyName={company_name} />
      </div>

      {/* Location row */}
      <div className="card-location-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: '#666666', marginBottom: '14px' }}>
        <FiHome style={{ color: '#888888', fontSize: '14px', flexShrink: 0 }} />
        <span>{displayLocation}</span>
      </div>

      {/* Grid columns row */}
      <div className="card-grid-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '16px', borderBottom: '1px solid #f1f3f5', paddingBottom: '16px', marginBottom: '16px' }}>
        {/* Column 1: START DATE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: '#888888', letterSpacing: '0.3px' }}>START DATE</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: '#333333' }}>
            <FiPlay style={{ color: '#888888', fontSize: '13px', transform: 'rotate(90deg)' }} />
            <span>{start_date || 'Starts Immediately'}</span>
          </div>
        </div>

        {/* Column 2: DURATION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: '#888888', letterSpacing: '0.3px' }}>DURATION</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: '#333333' }}>
            <FiCalendar style={{ color: '#888888', fontSize: '13px' }} />
            <span>{duration || '1 Month'}</span>
          </div>
        </div>

        {/* Column 3: STIPEND */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: '#888888', letterSpacing: '0.3px' }}>STIPEND</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: '#333333' }}>
            <svg style={{ width: '13px', height: '13px', fill: 'none', stroke: '#888888', strokeWidth: '2' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{stipendText}</span>
          </div>
        </div>

        {/* Column 4: APPLY BY */}
        {application_deadline && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: '500', color: '#888888', letterSpacing: '0.3px' }}>APPLY BY</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: '#333333' }}>
              <FiCalendar style={{ color: '#888888', fontSize: '13px' }} />
              <span>{application_deadline}</span>
            </div>
          </div>
        )}
      </div>

      {/* Description / Responsibilities line */}
      {description && (
        <div className="card-description-row" style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px', color: '#666666', marginBottom: '12px', lineHeight: '1.4' }}>
          <FiFileText style={{ color: '#888888', fontSize: '14px', flexShrink: 0, marginTop: '2px' }} />
          <span style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</span>
        </div>
      )}

      {/* Skills tags list */}
      {skills && skills.length > 0 && (
        <div className="card-skills-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {skills.map((skill, index) => (
            <span key={index} className="card-skill-tag" style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#F1F3F5', color: '#495057' }}>
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer tags line */}
      <div className="card-footer" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', borderTop: 'none', paddingTop: 0 }}>
        {posted_by_label && (
          <div className="card-footer-badge green" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', backgroundColor: '#EBF6EC', color: '#2E7D32', border: '1px solid #D4ECD5', fontWeight: '500' }}>
            <FiClock />
            <span>{posted_by_label}</span>
          </div>
        )}

        {/* If the card is an early applicant target */}
        {internship.id === 102 && (
          <div className="card-footer-badge yellow" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', backgroundColor: '#FFF9E6', color: '#B27B00', border: '1px solid #FFE0B2', fontWeight: '500' }}>
            <svg style={{ width: '11px', height: '11px', fill: 'none', stroke: '#B27B00', strokeWidth: '2.5' }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Be an early applicant</span>
          </div>
        )}

        {is_ppo && (
          <div className="card-footer-badge orange" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', backgroundColor: '#FDF2E9', color: '#D35400', border: '1px solid #FADBD8', fontWeight: '500' }}>
            <FiCheckCircle />
            <span>{ppo_label_value || 'Job offer post internship'}</span>
          </div>
        )}

        {part_time && (
          <span className="card-footer-text" style={{ fontSize: '11.5px', color: '#888888', fontWeight: '500', marginLeft: '4px' }}>
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


