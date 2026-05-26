import { createContext, useState, useContext, useCallback } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  // Basic filter states
  const [profile, setProfile] = useState('');
  const [location, setLocation] = useState('');
  const [wfh, setWfh] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [stipend, setStipend] = useState(0);
  const [duration, setDuration] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [preferences, setPreferences] = useState(false);
  const [inMyCity, setInMyCity] = useState(false);

  // Additional filter states
  const [startDate, setStartDate] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [jobOffer, setJobOffer] = useState(false);
  const [fastResponse, setFastResponse] = useState(false);
  const [earlyApplicant, setEarlyApplicant] = useState(false);
  const [forWomen, setForWomen] = useState(false);

  // NEW: Sorting, Favorites, Pagination
  const [sortBy, setSortBy] = useState(() => localStorage.getItem('sortBy') || 'newest');
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10; // constant page size

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      localStorage.setItem('favorites', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const loadMore = () => setPage((p) => p + 1);

  const clearAllFilters = useCallback(() => {
    setProfile('');
    setLocation('');
    setWfh(false);
    setPartTime(false);
    setStipend(0);
    setDuration('');
    setSearchQuery('');
    setPreferences(false);
    setInMyCity(false);
    setStartDate('');
    setMaxDuration('');
    setJobOffer(false);
    setFastResponse(false);
    setEarlyApplicant(false);
    setForWomen(false);
    setShowSavedOnly(false);
    setIsMobileFiltersOpen(false);
    // Preserve sorting, favorites, and pagination state (reset pagination to first page)
    setPage(1);
  }, []);

  const value = {
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
    startDate,
    setStartDate,
    maxDuration,
    setMaxDuration,
    jobOffer,
    setJobOffer,
    fastResponse,
    setFastResponse,
    earlyApplicant,
    setEarlyApplicant,
    forWomen,
    setForWomen,
    clearAllFilters,
    // New exports
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    showSavedOnly,
    setShowSavedOnly,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
    page,
    setPage,
    pageSize,
    loadMore,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);

