import React, { useState, useEffect, useRef } from 'react';
import { useFilters } from '../context/FilterContext';
import { FiSearch, FiChevronDown, FiX } from 'react-icons/fi';

const ALL_PROFILES = [
  ".NET Development",
  "3D Printing",
  "AI Agent Development",
  "Accounts",
  "Acting",
  "Aerospace Engineering",
  "Agriculture & Food Engineering",
  "Analytics",
  "Android App Development",
  "Big Data",
  "Blockchain",
  "Business Development",
  "Content Writing",
  "Data Science",
  "Digital Marketing",
  "Flutter Development",
  "Front End Development",
  "Full Stack Development",
  "Graphic Design",
  "Human Resources (HR)",
  "Java Development",
  "Marketing",
  "Mobile App Development",
  "Node.js Development",
  "Python Development",
  "ReactJS Development",
  "Software Development Engineering (Web)",
  "UI/UX Design",
  "Web Development"
];

const ALL_LOCATIONS = [
  "Bangalore",
  "Chennai",
  "Delhi",
  "Gurgaon",
  "Hyderabad",
  "Jaipur",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Munnar",
  "Noida",
  "Pune"
];

const CustomFilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', marginTop: '1px' }}>
    {/* Funnel shape path */}
    <path d="M3 4H21V6.5L14 13.5V19.5L10 21.5V13.5L3 6.5V4Z" stroke="#008BDC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Checkmark circle badge overlay */}
    <circle cx="17" cy="7" r="4.5" fill="#008BDC" stroke="#FFFFFF" strokeWidth="1" />
    {/* White checkmark inside the circle */}
    <path d="M15.5 7L16.5 8L18.5 6" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Filters = () => {
  const {
    profile,
    setProfile,
    location,
    setLocation,
    wfh,
    setWfh,
    partTime,
    setPartTime,
    stipend,
    setStipend,
    duration,
    setDuration,
    searchQuery,
    setSearchQuery,
    preferences,
    setPreferences,
    inMyCity,
    setInMyCity,
    clearAllFilters,
  } = useFilters();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const profileRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearAll = (e) => {
    e.preventDefault();
    clearAllFilters();
  };

  const filteredProfiles = ALL_PROFILES.filter(p =>
    p.toLowerCase().includes(profile.toLowerCase())
  );

  const filteredLocations = ALL_LOCATIONS.filter(l =>
    l.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="filters-sidebar">
      {/* Primary Filters Card */}
      <div className="filters-card">
        {/* Header Title with Blue Funnel Icon */}
        <div className="filters-header" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginBottom: '18px' }}>
          <CustomFilterIcon />
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#212529' }}>Filters</span>
        </div>

        {/* Checkbox: As per my preferences */}
        <div className="filter-group">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={preferences}
              onChange={(e) => {
                setPreferences(e.target.checked);
                if (e.target.checked) {
                  setSearchQuery('');
                }
              }}
            />
            <span>
              As per my <a href="#preferences" onClick={(e) => e.preventDefault()}>preferences</a>
            </span>
          </label>
        </div>

        {/* Profile Filter */}
        <div className={`filter-group ${preferences ? 'disabled' : ''}`} ref={profileRef}>
          <label className="filter-label">Profile</label>
          <input
            type="text"
            className="filter-input"
            value={profile}
            onChange={(e) => {
              setProfile(e.target.value);
              setShowProfileDropdown(true);
            }}
            onFocus={() => setShowProfileDropdown(true)}
            placeholder="e.g. Marketing"
            disabled={preferences}
          />
          {showProfileDropdown && !preferences && (
            <div className="filter-dropdown">
              {filteredProfiles.map((pOption) => (
                <div
                  key={pOption}
                  className={`filter-dropdown-item ${profile.toLowerCase() === pOption.toLowerCase() ? 'selected' : ''}`}
                  onClick={() => {
                    setProfile(pOption);
                    setShowProfileDropdown(false);
                  }}
                >
                  {pOption}
                </div>
              ))}
              {filteredProfiles.length === 0 && (
                <div className="filter-dropdown-item" style={{ color: '#888', cursor: 'default' }}>
                  No profiles found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className={`filter-group ${preferences ? 'disabled' : ''}`} ref={locationRef}>
          <label className="filter-label">Location</label>
          <input
            type="text"
            className="filter-input"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowLocationDropdown(true);
            }}
            onFocus={() => setShowLocationDropdown(true)}
            placeholder="e.g. Delhi"
            disabled={wfh || preferences}
            style={(wfh || preferences) ? { backgroundColor: '#f9f9f9', cursor: 'not-allowed', color: '#b0b0b0' } : {}}
          />
          {showLocationDropdown && !wfh && !preferences && (
            <div className="filter-dropdown">
              {filteredLocations.map((lOption) => (
                <div
                  key={lOption}
                  className={`filter-dropdown-item ${location.toLowerCase() === lOption.toLowerCase() ? 'selected' : ''}`}
                  onClick={() => {
                    setLocation(lOption);
                    setShowLocationDropdown(false);
                  }}
                >
                  {lOption}
                </div>
              ))}
              {filteredLocations.length === 0 && (
                <div className="filter-dropdown-item" style={{ color: '#888', cursor: 'default' }}>
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Checkboxes: Internships in my city, Work from home, Part-time */}
        <div className="filter-group" style={{ margin: '20px 0 16px' }}>
          <label className={`filter-checkbox ${preferences ? 'disabled' : ''}`}>
            <input
              type="checkbox"
              checked={inMyCity}
              onChange={(e) => setInMyCity(e.target.checked)}
              disabled={preferences}
            />
            <span>Internships in my city</span>
          </label>

          <label className={`filter-checkbox ${preferences ? 'disabled' : ''}`}>
            <input
              type="checkbox"
              checked={wfh}
              onChange={(e) => {
                setWfh(e.target.checked);
                if (e.target.checked) setLocation(''); // Clear location if WFH
              }}
              disabled={preferences}
            />
            <span>Work from home</span>
          </label>

          <label className={`filter-checkbox ${preferences ? 'disabled' : ''}`}>
            <input
              type="checkbox"
              checked={partTime}
              onChange={(e) => setPartTime(e.target.checked)}
              disabled={preferences}
            />
            <span>Part-time</span>
          </label>
        </div>

        {/* Stipend Custom Slider (0 - 10K to match screenshot exactly) */}
        <div className="filter-group">
          <label className="stipend-label">
            Desired minimum monthly stipend (₹)
          </label>
          <div className="stipend-slider-wrapper">
            <input
              type="range"
              className="stipend-slider"
              min="0"
              max="10000"
              step="2000"
              value={stipend > 10000 ? 10000 : stipend}
              onChange={(e) => setStipend(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #008BDC 0%, #008BDC ${(stipend / 10000) * 100}%, #e0e0e0 ${(stipend / 10000) * 100}%, #e0e0e0 100%)`
              }}
            />
          </div>
          <div className="stipend-range-labels">
            <span style={stipend === 0 ? { color: '#212529', fontWeight: '700' } : { color: '#888888' }}>0</span>
            <span style={stipend === 2000 ? { color: '#212529', fontWeight: '700' } : { color: '#888888' }}>2K</span>
            <span style={stipend === 4000 ? { color: '#212529', fontWeight: '700' } : { color: '#888888' }}>4K</span>
            <span style={stipend === 6000 ? { color: '#212529', fontWeight: '700' } : { color: '#888888' }}>6K</span>
            <span style={stipend === 8000 ? { color: '#212529', fontWeight: '700' } : { color: '#888888' }}>8K</span>
            <span style={stipend === 10000 ? { color: '#212529', fontWeight: '700' } : { color: '#888888' }}>10K</span>
          </div>
        </div>

        {/* View More Filters */}
        <div className="view-more-link">
          <span>View more filters</span>
          <FiChevronDown style={{ fontSize: '12px' }} />
        </div>

        {/* Clear All Link at bottom right */}
        {(profile || location || wfh || partTime || stipend > 0 || searchQuery || preferences || inMyCity) && (
          <span className="clear-all-link" onClick={handleClearAll}>
            Clear all
          </span>
        )}
        <div style={{ clear: 'both' }}></div>
      </div>

      {/* Separate Keyword Search Card */}
      <div className="keyword-search-card">
        <div className="keyword-card-title">Keyword Search</div>
        <div className="keyword-row">
          <input
            type="text"
            className="filter-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Design, Mumbai, Infosys"
            style={{ flex: 1 }}
          />
          {searchQuery ? (
            <button
              type="button"
              className="keyword-btn-search"
              onClick={() => setSearchQuery('')}
              style={{ backgroundColor: '#f44336' }}
              title="Clear Search"
            >
              <FiX />
            </button>
          ) : (
            <button
              type="button"
              className="keyword-btn-search"
              title="Search"
            >
              <FiSearch />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;


