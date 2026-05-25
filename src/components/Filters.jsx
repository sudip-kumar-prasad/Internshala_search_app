import React from 'react';
import { useFilters } from '../context/FilterContext';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';

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
        <div className="filters-header">
          <div className="filters-title">
            <FiFilter />
            <span>Filters</span>
          </div>
          {(profile || location || wfh || partTime || stipend > 0 || duration || searchQuery) && (
            <button type="button" className="clear-all-btn" onClick={handleClearAll}>
              Clear all
            </button>
          )}
        </div>

        {/* Profile Filter */}
        <div className="filter-group">
          <label className="filter-label">Profile</label>
          <input
            type="text"
            className="filter-input"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="e.g. Web Development"
          />
        </div>

        {/* Location Filter */}
        <div className="filter-group">
          <label className="filter-label">Location</label>
          <input
            type="text"
            className="filter-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Gurgaon, Bangalore"
            disabled={wfh}
            style={wfh ? { backgroundColor: '#f0f0f0', cursor: 'not-allowed', color: '#888' } : {}}
          />
        </div>

        {/* Checkbox Filters */}
        <div className="filter-group" style={{ marginTop: '20px' }}>
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={wfh}
              onChange={(e) => {
                setWfh(e.target.checked);
                if (e.target.checked) setLocation(''); // clear location if WFH selected
              }}
            />
            <span>Work from home</span>
          </label>

          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={partTime}
              onChange={(e) => setPartTime(e.target.checked)}
            />
            <span>Part-time</span>
          </label>
        </div>

        <div className="filter-divider"></div>

        {/* Duration Filter */}
        <div className="filter-group">
          <label className="filter-label">Desired maximum duration (in months)</label>
          <select
            className="filter-input"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Choose duration</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="4">4 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>

        <div className="filter-divider"></div>

        {/* Stipend Filter */}
        <div className="filter-group">
          <label className="stipend-label">
            Minimum stipend (₹): <span style={{ color: '#083d77', fontWeight: '700' }}>{stipend > 0 ? `₹${stipend.toLocaleString()}` : 'Any'}</span>
          </label>
          <input
            type="range"
            className="stipend-slider"
            min="0"
            max="50000"
            step="2000"
            value={stipend}
            onChange={(e) => setStipend(Number(e.target.value))}
          />
          <div className="stipend-range-labels">
            <span>0</span>
            <span>10k</span>
            <span>20k</span>
            <span>30k</span>
            <span>40k</span>
            <span>50k</span>
          </div>
        </div>
      </div>

      {/* Keyword Search Card */}
      <div className="keyword-card">
        <div className="keyword-title">Search by Keywords</div>
        <div className="keyword-input-wrapper">
          <input
            type="text"
            className="keyword-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Design, Google, Java"
          />
          {searchQuery ? (
            <button
              type="button"
              className="keyword-btn"
              onClick={() => setSearchQuery('')}
              style={{ background: '#f44336' }}
              title="Clear Search"
            >
              <FiX />
            </button>
          ) : (
            <button type="button" className="keyword-btn" title="Search">
              <FiSearch />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;

