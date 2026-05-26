import React, { useEffect, useState, Suspense, lazy, useMemo } from "react";
import { FilterProvider, useFilters } from "./context/FilterContext";
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
  <svg
    width="118"
    height="32"
    viewBox="0 0 118 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      cursor: 'pointer',
      display: 'block',
      width: '118px',
      height: '32px',
      minWidth: '118px',
      minHeight: '32px',
      flexShrink: 0,
    }}
  >
    <path d="M91.1885 5.48222L96.1378 9.29731L96.1213 14.5188L100.143 11.873L104.007 14.6013L112.686 1L91.1885 5.48222ZM98.4609 10.5594L97.0513 12.9309L97.0575 8.93951L109.964 2.72504L98.4609 10.5594Z" fill="#00A5EC"/>
    <path d="M1 19.8433H3.21997V30.9957H1V19.8433Z" fill="#00A5EC"/>
    <path d="M5.45605 30.9962V19.853H6.20154L13.1832 26.8326V19.853H15.4103V30.9962H14.5947L7.68634 24.0878V30.9962H5.45605Z" fill="#00A5EC"/>
    <path d="M26.8154 19.853V21.9328H23.1034V30.9952H20.8721V21.9328H17.1602V19.853H26.8154Z" fill="#00A5EC"/>
    <path d="M28.4414 30.9958V19.8599H36.6315V21.9396H30.6717V24.3111H35.1395V26.3847H30.6717V28.9171H36.615V30.9989L28.4414 30.9958Z" fill="#00A5EC"/>
    <path d="M45.5825 26.1345L48.3582 30.9952H45.8052L43.1346 26.3882H41.1002V30.9952H38.873V19.853H43.7306C46.331 19.853 47.6309 20.9219 47.6302 23.0598C47.7033 23.731 47.5383 24.4066 47.1641 24.9686C46.7898 25.5306 46.23 25.9432 45.5825 26.1345ZM41.1002 24.3084H44.2235C45.1185 24.2919 45.5814 23.8847 45.6031 23.0835C45.5825 22.3493 45.1267 21.9699 44.2441 21.9379H41.1002V24.3095V24.3084Z" fill="#00A5EC"/>
    <path d="M49.5205 30.9962V19.853H50.2598L57.2466 26.8326V19.853H59.4738V30.9962H58.6551L51.7467 24.0878V30.9962H49.5205Z" fill="#00A5EC"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M79.2275 18.5012C84.5615 17.7279 89.5933 15.8832 94.788 14.1582C93.1795 15.4491 81.1671 18.8219 79.2275 18.5012Z" fill="#666666"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M100.139 11.873L96.1172 14.5189L98.4599 10.5625L100.139 11.873Z" fill="#666666"/>
    <path d="M67.8185 20.2238C68.4154 20.4912 68.9566 20.8686 69.4137 21.3364L67.9309 22.8243C67.6755 22.5256 67.3545 22.2898 66.9931 22.1353C66.6317 21.9808 66.2395 21.9117 65.8471 21.9334C64.9572 21.9334 64.387 22.1396 64.1406 22.5634C64.0192 22.7168 63.9532 22.9066 63.9532 23.1022C63.9532 23.2977 64.0192 23.4876 64.1406 23.6409C64.6223 24.0423 65.2209 24.2771 65.8471 24.3101C66.7657 24.3999 67.6472 24.719 68.4104 25.2381C68.8006 25.5181 69.1117 25.8943 69.3135 26.3301C69.5153 26.7659 69.601 27.2465 69.5621 27.7251C69.5549 28.1787 69.4398 28.6241 69.2264 29.0244C69.0131 29.4248 68.7076 29.7686 68.3351 30.0276C67.5192 30.6691 66.5074 31.0103 65.4697 30.9938C64.5847 31.0207 63.7034 30.8688 62.8785 30.5473C62.2129 30.2702 61.6074 29.8664 61.0957 29.3584L62.5754 27.8767C62.9056 27.8767 63.2991 28.4736 63.7328 28.6524C64.1664 28.8313 64.6315 28.9216 65.1005 28.9181C66.0925 28.9181 66.708 28.7119 66.9565 28.2881C67.0768 28.0993 67.1407 27.88 67.1407 27.6561C67.1407 27.4321 67.0768 27.2129 66.9565 27.024C66.7091 26.6043 66.0956 26.3424 65.1005 26.2434C64.2342 26.1527 63.3981 25.874 62.6506 25.4268C62.2719 25.1818 61.9678 24.8375 61.7714 24.4315C61.575 24.0255 61.494 23.5733 61.537 23.1243C61.5295 22.6542 61.6417 22.1899 61.863 21.775C62.0843 21.3602 62.4075 21.0084 62.8022 20.7528C63.5551 20.1883 64.4669 19.8758 65.4078 19.8599C66.2275 19.8215 67.0467 19.9451 67.8185 20.2238Z" fill="#666666"/>
    <path d="M71.5537 30.9972V19.854H73.784V24.3094H78.9766V19.8447H81.21V30.9869L78.9766 30.9972V26.3902H73.784V30.9972H71.5537Z" fill="#666666"/>
    <path d="M83.0215 30.9972L87.4759 19.854H89.7061L94.1564 30.9899L91.7848 31.0003L91.1157 29.2927H86.0632L85.3941 31.0003L83.0215 30.9972ZM88.6513 22.8246L86.9562 27.0604H90.299L88.6513 22.8246Z" fill="#666666"/>
    <path d="M98.0769 19.854V28.9154H104.02V30.9972H95.8477V19.854H98.0769Z" fill="#666666"/>
    <path d="M105.268 30.9972L109.728 19.854H111.955L116.405 30.9899L114.033 31.0003L113.372 29.2896H108.32L107.652 30.9972H105.268ZM110.897 22.8246L109.203 27.0604H112.547L110.897 22.8246Z" fill="#666666"/>
  </svg>
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
  const [error, setError] = useState(false);

  const {
    profile,
    location,
    wfh,
    partTime,
    stipend,
    searchQuery,
    preferences,
    startDate,
    maxDuration,
    jobOffer,
    fastResponse,
    earlyApplicant,
    forWomen,
    // New states from FilterContext
    sortBy,
    favorites,
    showSavedOnly,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
  } = useFilters();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
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
        setInternships(items);
      } else {
        setInternships([]);
      }
    } catch (error) {
      console.warn("Failed to fetch from live endpoint.", error);
      setError(true);
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Comprehensive client-side filtering and sorting logic
  const filteredInternships = useMemo(() => {
    const getDurationInMonths = (durStr) => {
      if (!durStr) return 0;
      const str = durStr.toLowerCase();
      const match = str.match(/(\d+)\s*month/);
      if (match) return parseInt(match[1]);
      if (str.includes("week")) return 0.25;
      return 0;
    };

    let result = internships.filter((item) => {
      // 0. Favorites-only view filter
      if (showSavedOnly && !favorites.has(item.id)) {
        return false;
      }

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
        // When preferences is enabled, we only display internships matching user's preferred roles
        const preferredKeywords = ["web", "software", "front end", "ai", "artificial intelligence", "data science", "android", "developer", "development"];
        const title = item.title ? item.title.toLowerCase() : "";
        const profileName = item.profile_name ? item.profile_name.toLowerCase() : "";
        const matchesPreferred = preferredKeywords.some(keyword => 
          title.includes(keyword) || profileName.includes(keyword)
        );
        if (!matchesPreferred) return false;
      }

      // 5. Stipend Filter (minimum stipend amount)
      if (stipend > 0) {
        const salaryVal = item.stipend ? item.stipend.salaryValue1 : 0;
        if (salaryVal < stipend) return false;
      }

      // 6. Max Duration Filter
      if (maxDuration) {
        const maxD = parseInt(maxDuration);
        const itemD = getDurationInMonths(item.duration);
        if (itemD > maxD) return false;
      }

      // 7. Job Offer Filter
      if (jobOffer && !item.is_ppo) {
        return false;
      }

      // 8. Early Applicant Filter
      if (earlyApplicant && !item.is_early_applicant) {
        return false;
      }

      // 9. Internships for Women Filter
      if (forWomen) {
        const desc = item.description ? item.description.toLowerCase() : "";
        const title = item.title ? item.title.toLowerCase() : "";
        if (!item.for_women && !desc.includes("women") && !title.includes("women")) {
          return false;
        }
      }

      // 10. General Keyword Search
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

    // Client-side sorting logic
    if (sortBy === 'newest') {
      result.sort((a, b) => {
        const timeA = a.postedOnDateTime || 0;
        const timeB = b.postedOnDateTime || 0;
        if (timeB !== timeA) return timeB - timeA;
        return b.id - a.id;
      });
    } else if (sortBy === 'stipend') {
      result.sort((a, b) => {
        const salA = a.stipend?.salaryValue1 || 0;
        const salB = b.stipend?.salaryValue1 || 0;
        return salB - salA;
      });
    } else if (sortBy === 'popularity') {
      const getApplicantsCount = (item) => {
        const text = item.application_status_message?.message || '';
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
      };
      result.sort((a, b) => {
        return getApplicantsCount(b) - getApplicantsCount(a);
      });
    }

    return result;
  }, [internships, profile, location, wfh, partTime, stipend, searchQuery, preferences, startDate, maxDuration, jobOffer, fastResponse, earlyApplicant, forWomen, showSavedOnly, favorites, sortBy]);

  return (
    <div className="page-wrapper">
      {/* Mobile Floating Filter Drawer trigger FAB */}
      <button
        className="mobile-filters-trigger-fab"
        onClick={() => setIsMobileFiltersOpen(true)}
        aria-label="Open Filters Menu"
        role="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
          <path d="M3 4H21V6.5L14 13.5V19.5L10 21.5V13.5L3 6.5V4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span>Filters</span>
      </button>

      {/* Backdrop overlay for mobile drawer */}
      {isMobileFiltersOpen && (
        <div
          className="filters-backdrop-overlay"
          onClick={() => setIsMobileFiltersOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Sidebar + Result Area Layout */}
      <div className="content-layout">
        {/* Filters Sidebar (receives drawer state class via CSS selector) */}
        <div className={`filters-sidebar-container ${isMobileFiltersOpen ? 'drawer-open' : ''}`}>
          <Suspense fallback={
            <div className="filters-sidebar">
              <div className="filters-card" style={{ height: '380px' }}>Loading filters...</div>
            </div>
          }>
            <Filters />
          </Suspense>
        </div>

        {/* Listings Result List */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Centered Total Internships Heading */}
          <div className="total-count-heading">
            <h1>
              {loading ? "Loading..." : `${filteredInternships.length} ${showSavedOnly ? 'Saved' : 'Total'} Internships`}
            </h1>
            <p>{showSavedOnly ? "Your Bookmarked Opportunities" : "Latest Summer Internships"}</p>
          </div>

          {loading ? (
            <div className="listings-container">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : error ? (
            <div className="empty-state" style={{ padding: '40px 20px' }}>
              <h3>Failed to load internships</h3>
              <p>Please check your network connection or try again.</p>
              <button type="button" className="empty-state-btn" onClick={fetchData}>
                Retry Fetch
              </button>
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
