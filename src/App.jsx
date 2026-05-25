import React, { useEffect, useState, Suspense, lazy, useMemo } from "react";
import { FilterProvider, useFilters } from "./context/FilterContext";
import { fallbackInternships } from "./mockData";
import { FiChevronDown, FiMessageSquare, FiChevronRight } from 'react-icons/fi';
import "./index.css";

// Lazy load filter and list components for speed and splitting
const Filters = lazy(() => import("./components/Filters"));
const InternshipList = lazy(() => import("./components/InternshipList"));

// Premium Skeleton card for loading screen
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line" style={{ height: '18px', width: '40%', marginBottom: '12px' }} />
    <div className="skeleton-line" style={{ height: '14px', width: '25%', marginBottom: '20px' }} />
    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
      <div className="skeleton-line" style={{ height: '14px', width: '100px' }} />
      <div className="skeleton-line" style={{ height: '14px', width: '100px' }} />
      <div className="skeleton-line" style={{ height: '14px', width: '100px' }} />
    </div>
    <div className="skeleton-line" style={{ height: '14px', width: '90%', marginBottom: '12px' }} />
    <div className="skeleton-line" style={{ height: '24px', width: '120px', borderRadius: '4px', marginTop: '16px' }} />
  </div>
);

// Official inline paper plane SVG logo
const OfficialLogo = () => (
  <div className="logo" style={{ color: '#003366', cursor: 'pointer' }}>
    <span>Intern</span>
    <span style={{ position: 'relative' }}>
      shala
      <svg
        style={{
          position: 'absolute',
          top: '-6px',
          right: '-18px',
          width: '15px',
          height: '15px',
          fill: '#008BDC',
          transform: 'rotate(10deg)',
        }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </span>
  </div>
);

function SearchDashboard() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    profile,
    location,
    wfh,
    partTime,
    stipend,
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
          // Merge API items with Basti Ki Pathshala & NayePankh Foundation mocks to guarantee they show at the top!
          const merged = [...fallbackInternships.slice(0, 3), ...items, ...fallbackInternships.slice(3)];
          // Remove duplicate IDs if any
          const seen = new Set();
          const unique = merged.filter(item => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
          });
          setInternships(unique);
        } else {
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
        // If unpaid, stipend amount is 0, so if stipend slider > 0, unpaid will be filtered out!
        const salaryVal = item.stipend ? item.stipend.salaryValue1 : 0;
        if (salaryVal < stipend) return false;
      }

      // 6. General Keyword Search (Query matching multiple fields)
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
  }, [internships, profile, location, wfh, partTime, stipend, searchQuery]);

  return (
    <div className="page-wrapper">
      {/* Breadcrumb path matching exactly */}
      <div className="breadcrumb">
        <a href="#home" onClick={(e) => e.preventDefault()}>Home</a>
        <span>&gt;</span>
        <a href="#internships" style={{ color: '#333333', fontWeight: '500' }} onClick={(e) => e.preventDefault()}>Internships</a>
      </div>

      {/* Dynamic Count Header Centered */}
      <div className="page-title">
        <h1>
          {loading ? "Finding Internships..." : `${filteredInternships.length} Total Internships`}
        </h1>
        <p>Latest Summer Internships in India</p>
      </div>

      {/* Sidebar + Result Area Layout */}
      <div className="content-layout">
        {/* Filters Sidebar */}
        <Suspense fallback={
          <div className="filters-sidebar">
            <div className="filters-card" style={{ height: '380px' }}>Loading filters...</div>
          </div>
        }>
          <Filters />
        </Suspense>

        {/* Listings Result List */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div className="listings-container">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <Suspense fallback={
              <div className="listings-container">
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
        {/* Top Banner Announcement Bar */}
        <div className="announcement-bar">
          Pursue B.Tech in Computer Science with Gen AI and other in-demand specialisations.{" "}
          <a href="#know-more" onClick={(e) => e.preventDefault()}>Know more</a>
        </div>

        {/* High-Fidelity Header Navigation */}
        <header className="header">
          <div className="header-inner">
            {/* Logo */}
            <OfficialLogo />

            {/* Nav Menu Links */}
            <nav className="nav">
              <span className="nav-item active">
                <span>Internships</span>
                <FiChevronDown style={{ fontSize: '11px', marginTop: '2px', color: '#888888' }} />
              </span>
              <span className="nav-item">
                <span>Courses</span>
                <span className="nav-badge-offer">OFFER</span>
                <FiChevronDown style={{ fontSize: '11px', marginTop: '2px', color: '#888888' }} />
              </span>
              <span className="nav-item">
                <span>Jobs</span>
                <FiChevronDown style={{ fontSize: '11px', marginTop: '2px', color: '#888888' }} />
              </span>
              <span className="nav-item" style={{ fontWeight: '700' }}>
                IS PRO
              </span>

              {/* Chat bubble icon */}
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '12px', cursor: 'pointer', color: '#484848' }}>
                <FiMessageSquare style={{ fontSize: '19px' }} />
              </div>

              {/* Avatar circle */}
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <div className="avatar-circle">S</div>
                <FiChevronDown style={{ fontSize: '11px', marginLeft: '4px', color: '#888888' }} />
              </div>
            </nav>
          </div>
        </header>

        {/* Main Search Panel Dashboard */}
        <main style={{ flex: 1 }}>
          <SearchDashboard />
        </main>
      </div>
    </FilterProvider>
  );
}

export default App;


