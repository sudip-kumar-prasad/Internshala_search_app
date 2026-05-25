import React, { useEffect, useState, Suspense, lazy, useMemo } from "react";
import { FilterProvider, useFilters } from "./context/FilterContext";
import { fallbackInternships } from "./mockData";
import { FiChevronRight, FiMapPin, FiCalendar, FiClock, FiDollarSign } from 'react-icons/fi';
import "./index.css";

// Lazy load filter and list components for speed and splitting
const Filters = lazy(() => import("./components/Filters"));
const InternshipList = lazy(() => import("./components/InternshipList"));

// Premium Skeleton card for loading screen
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line wide" style={{ height: '18px', marginBottom: '12px' }} />
    <div className="skeleton-line medium" style={{ marginBottom: '16px' }} />
    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
      <div className="skeleton-line narrow" style={{ width: '80px' }} />
      <div className="skeleton-line narrow" style={{ width: '80px' }} />
      <div className="skeleton-line narrow" style={{ width: '80px' }} />
    </div>
    <div className="skeleton-line wide" style={{ height: '32px', borderRadius: '20px', marginTop: '12px' }} />
  </div>
);

function SearchDashboard() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    profile,
    location,
    wfh,
    partTime,
    stipend,
    duration,
    searchQuery,
  } = useFilters();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://internshala.com/hiring/search");
        if (!response.ok) {
          throw new Error("API call failed");
        }
        const data = await response.json();
        
        // Parse custom Internshala response format: keys to array mapper
        const ids = data.internship_ids || [];
        const items = ids.map(id => data.internships_meta[id]).filter(Boolean);
        
        if (items.length > 0) {
          setInternships(items);
        } else {
          // Fallback to high-quality mockup if empty array is returned
          setInternships(fallbackInternships);
        }
      } catch (error) {
        console.warn("Failed to fetch from live endpoint, loading mock fallback data.", error);
        setInternships(fallbackInternships);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Comprehensive client-side filtering logic
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      // 1. Profile Filter
      if (profile) {
        const pQuery = profile.toLowerCase();
        const titleMatches = item.title ? item.title.toLowerCase().includes(pQuery) : false;
        const profileMatches = item.profile_name ? item.profile_name.toLowerCase().includes(pQuery) : false;
        if (!titleMatches && !profileMatches) return false;
      }

      // 2. Location Filter
      if (location && !wfh) {
        const lQuery = location.toLowerCase();
        const locationMatches = item.location_names
          ? item.location_names.some((name) => name.toLowerCase().includes(lQuery))
          : false;
        if (!locationMatches) return false;
      }

      // 3. Work From Home Filter
      if (wfh && !item.work_from_home) {
        return false;
      }

      // 4. Part-time Filter
      if (partTime && !item.part_time) {
        return false;
      }

      // 5. Stipend Filter (minimum stipend amount)
      if (stipend > 0) {
        const salaryVal = item.stipend ? item.stipend.salaryValue1 : 0;
        if (!salaryVal || salaryVal < stipend) return false;
      }

      // 6. Duration Filter (maximum duration in months)
      if (duration) {
        const match = item.duration ? item.duration.match(/(\d+)\s*Month/i) : null;
        if (match) {
          const itemMonths = parseInt(match[1], 10);
          if (itemMonths > parseInt(duration, 10)) return false;
        }
      }

      // 7. General Keyword Search (Query matching multiple fields)
      if (searchQuery) {
        const sQuery = searchQuery.toLowerCase();
        const titleMatches = item.title ? item.title.toLowerCase().includes(sQuery) : false;
        const companyMatches = item.company_name ? item.company_name.toLowerCase().includes(sQuery) : false;
        const profileMatches = item.profile_name ? item.profile_name.toLowerCase().includes(sQuery) : false;
        const locationMatches = item.location_names
          ? item.location_names.some((name) => name.toLowerCase().includes(sQuery))
          : false;
        if (!titleMatches && !companyMatches && !profileMatches && !locationMatches) return false;
      }

      return true;
    });
  }, [internships, profile, location, wfh, partTime, stipend, duration, searchQuery]);

  return (
    <div className="page-wrapper">
      {/* Breadcrumb path */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <FiChevronRight />
        <a href="/">Internships</a>
        <FiChevronRight />
        <span>Search</span>
      </div>

      {/* Dynamic Count Header */}
      <div className="page-title">
        <h1>
          {loading ? "Finding Internships..." : `${filteredInternships.length} Total Internships`}
        </h1>
        <p>Apply to premium jobs and internships with certified credentials</p>
      </div>

      {/* Sidebar + Result Area Layout */}
      <div className="content-layout">
        {/* Filters Sidebar wrapper */}
        <Suspense fallback={
          <div className="filters-sidebar">
            <div className="filters-card" style={{ height: '350px' }}>Loading filters...</div>
          </div>
        }>
          <Filters />
        </Suspense>

        {/* Listings Result List */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div className="internship-list">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <Suspense fallback={
              <div className="internship-list">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            }>
              <InternshipList internships={filteredInternships} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <FilterProvider>
      <div id="root">
        {/* Premium Banner Top Announcement Bar */}
        <div className="announcement-bar">
          ⚡ <strong>Warm Up for your Dream Career!</strong> Get 80% off on premium placement prep courses.{" "}
          <a href="#learn-more">Explore Now</a>
        </div>

        {/* High-Fidelity Header Navigation */}
        <header className="header">
          <div className="header-inner">
            {/* Logo */}
            <div className="logo">
              <span style={{ color: '#008BDC' }}>Intern</span>
              <span style={{ color: '#333' }}>shala</span>
            </div>

            {/* Nav Menu Links */}
            <nav className="nav">
              <span className="nav-item active">Internships</span>
              <span className="nav-item">
                Jobs <span className="nav-badge">NEW</span>
              </span>
              <span className="nav-item">Courses</span>
              <span className="nav-item">Clubs</span>
            </nav>

            {/* Action buttons */}
            <div className="header-actions">
              <button
                type="button"
                className="is-pro-btn"
                style={{
                  background: 'linear-gradient(135deg, #008BDC, #00b4d8)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                PRO MEMBERSHIP
              </button>
              <button
                type="button"
                className="nav-item"
                style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '6px 16px' }}
              >
                Login
              </button>
              <button
                type="button"
                style={{
                  background: '#008BDC',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  fontWeight: '600',
                }}
              >
                Register
              </button>
            </div>
          </div>
        </header>

        {/* Main Search Panel Dashboard */}
        <main style={{ flex: 1 }}>
          <SearchDashboard />
        </main>

        {/* High-Fidelity Footer */}
        <footer
          style={{
            borderTop: '1px solid #e8e8e8',
            padding: '24px 20px',
            textAlign: 'center',
            background: '#fff',
            fontSize: '13px',
            color: '#888',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <span>© {new Date().getFullYear()} Internshala. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#privacy" style={{ hover: { textDecoration: 'underline' } }}>Privacy Policy</a>
              <a href="#terms">Terms & Conditions</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </FilterProvider>
  );
}

export default App;

