import React, { useEffect, useState, Suspense, lazy, useMemo } from "react";
import { FilterProvider, useFilters } from "./context/FilterContext";
import { fallbackInternships } from "./mockData";
import "./index.css";

// Lazy load filter and list components for speed and splitting
const Filters = lazy(() => import("./components/Filters"));
const InternshipList = lazy(() => import("./components/InternshipList"));

// Small solid caret down icon matching the official navigation dropdown caret
const CaretIcon = () => (
  <svg style={{ width: '8px', height: '6px', fill: '#484848', marginLeft: '6px', marginTop: '1px' }} viewBox="0 0 10 6">
    <path d="M0,0 L5,6 L10,0 Z" />
  </svg>
);

// Message bubble icon matching the screenshot exactly
const MessageIcon = () => (
  <svg
    style={{ width: '22px', height: '22px', fill: 'none', stroke: '#484848', strokeWidth: '1.8', cursor: 'pointer' }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

// Official Internshala Logo with Curved Gray Flight Path and Blue Paper Airplane
const OfficialLogo = () => (
  <div
    style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
      fontWeight: '800',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '-0.3px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  >
    <span style={{ color: '#00A5EC' }}>INTERN</span>
    <span style={{ color: '#484848', position: 'relative', marginLeft: '1.5px' }}>
      SHALA
      <svg
        style={{
          position: 'absolute',
          top: '-12px',
          right: '-24px',
          width: '28px',
          height: '22px',
        }}
        viewBox="0 0 28 22"
      >
        {/* Elegant curved flight trace line */}
        <path d="M2 18 C 6 12, 14 10, 20 13" stroke="#bdc3c7" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* 3D Paper Airplane */}
        {/* Top Main Wing */}
        <path d="M20 13 L26 2 L16 18 Z" fill="#00A5EC" />
        {/* Side Wing */}
        <path d="M26 2 L16 18 L14 12 Z" fill="#008BDC" />
        {/* Inner Fold/Shadow */}
        <path d="M16 18 L14 12 L11 13 Z" fill="#0073B7" />
      </svg>
    </span>
  </div>
);

// Premium Skeleton card for loading screen
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div style={{ flex: 1, marginRight: '16px' }}>
        <div className="skeleton-line" style={{ height: '18px', width: '60%', marginBottom: '12px' }} />
        <div className="skeleton-line" style={{ height: '14px', width: '40%', marginBottom: '12px' }} />
      </div>
      <div className="skeleton-line" style={{ height: '48px', width: '48px', borderRadius: '6px', flexShrink: 0 }} />
    </div>
    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
      <div className="skeleton-line" style={{ height: '14px', width: '100px' }} />
      <div className="skeleton-line" style={{ height: '14px', width: '100px' }} />
      <div className="skeleton-line" style={{ height: '14px', width: '100px' }} />
    </div>
    <div className="skeleton-line" style={{ height: '14px', width: '90%', marginBottom: '12px' }} />
    <div className="skeleton-line" style={{ height: '24px', width: '120px', borderRadius: '4px', marginTop: '16px' }} />
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
    preferences,
  } = useFilters();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Attempt to fetch from local proxied endpoint first to bypass CORS, fall back to direct if needed
        let response;
        try {
          response = await fetch("/api/hiring/search");
          if (!response.ok) {
            throw new Error("Local proxy call failed");
          }
        } catch (err) {
          console.warn("Proxy fetch failed, trying direct endpoint...", err);
          response = await fetch("https://internshala.com/hiring/search");
        }

        if (!response.ok) {
          throw new Error("Both proxy and direct fetch failed");
        }
        
        const data = await response.json();
        
        // Parse custom Internshala response format: keys to array mapper
        const ids = data.internship_ids || [];
        const items = ids.map(id => data.internships_meta[id]).filter(Boolean);
        
        if (items.length > 0) {
          // Put the live fetched data at the very top, followed by mock data as fallback/additional items
          const merged = [...items, ...fallbackInternships];
          // Remove duplicate IDs if any (keeping the first occurrence, which will be the live ones)
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
      // If preferences is active, we ignore profile/location/wfh/part-time inputs as they are disabled in UI
      if (!preferences) {
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
      } else {
        // When preferences is enabled, we only display internships matching user's preferred roles: SDE, Web, Front End, AI, Data Science, Android
        const preferredKeywords = ["web", "software", "front end", "ai", "artificial intelligence", "data science", "android", "developer", "development"];
        const title = item.title ? item.title.toLowerCase() : "";
        const profileName = item.profile_name ? item.profile_name.toLowerCase() : "";
        const matchesPreferred = preferredKeywords.some(keyword => 
          title.includes(keyword) || profileName.includes(keyword)
        );
        if (!matchesPreferred) return false;
      }

      // 5. Stipend Filter (minimum stipend amount) - active even in preferences mode
      if (stipend > 0) {
        const salaryVal = item.stipend ? item.stipend.salaryValue1 : 0;
        if (salaryVal < stipend) return false;
      }

      // 6. General Keyword Search (Query matching multiple fields) - active even in preferences mode
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
  }, [internships, profile, location, wfh, partTime, stipend, searchQuery, preferences]);

  return (
    <div className="page-wrapper">
      {/* Breadcrumb path matching exactly */}
      <div className="breadcrumb">
        <a href="#home" onClick={(e) => e.preventDefault()}>Home</a>
        <span>&gt;</span>
        <a href="#internships" style={{ color: '#333333', fontWeight: '500' }} onClick={(e) => e.preventDefault()}>Internships</a>
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
                <CaretIcon />
              </span>
              <span className="nav-item">
                <span>Courses</span>
                <span className="nav-badge-offer">OFFER</span>
                <CaretIcon />
              </span>
              <span className="nav-item">
                <span>Jobs</span>
                <CaretIcon />
              </span>
              <span className="nav-item" style={{ fontWeight: '600', color: '#484848' }}>
                IS PRO
              </span>

              {/* Chat bubble icon */}
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }}>
                <MessageIcon />
              </div>

              {/* Avatar circle */}
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <div className="avatar-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    style={{ width: '16px', height: '16px', fill: '#555555' }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <CaretIcon />
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
