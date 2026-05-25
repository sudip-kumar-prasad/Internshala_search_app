import React from 'react';
import { useFilters } from '../context/FilterContext';
import { FiFilter, FiSearch, FiChevronDown, FiX } from 'react-icons/fi';

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

  const handleClearAll = (e) => {
    e.preventDefault();
    clearAllFilters();
  };

  return (
    <div className="filters-sidebar">
      {/* Primary Filters Card */}
      <div className="filters-card">
        {/* Header Title with Blue Funnel Icon */}
        <div className="filters-header" style={{ justifyContent: 'center', position: 'relative' }}>
          <div className="filters-title-icon">
            <FiFilter />
          </div>
          <span style={{ fontSize: '13.5px', fontWeight: '700', letterSpacing: '0.5px', color: '#484848' }}>Filters</span>
        </div>

        {/* Checkbox: As per my preferences */}
        <div className="filter-group">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={preferences}
              onChange={(e) => setPreferences(e.target.checked)}
            />
            <span>
              As per my <a href="#preferences" onClick={(e) => e.preventDefault()}>preferences</a>
            </span>
          </label>
        </div>

        {/* Profile Filter */}
        <div className={`filter-group ${preferences ? 'disabled' : ''}`}>
          <label className="filter-label">Profile</label>
          <input
            type="text"
            className="filter-input"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="e.g. Marketing"
            disabled={preferences}
          />
        </div>

        {/* Location Filter */}
        <div className={`filter-group ${preferences ? 'disabled' : ''}`}>
          <label className="filter-label">Location</label>
          <input
            type="text"
            className="filter-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Delhi"
            disabled={wfh || preferences}
            style={(wfh || preferences) ? { backgroundColor: '#f9f9f9', cursor: 'not-allowed', color: '#b0b0b0' } : {}}
          />
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
            />
          </div>
          <div className="stipend-range-labels">
            <span>0</span>
            <span>2K</span>
            <span>4K</span>
            <span>6K</span>
            <span>8K</span>
            <span>10K</span>
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
            <button type="button" className="keyword-btn-search" title="Search">
              <FiSearch />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;


