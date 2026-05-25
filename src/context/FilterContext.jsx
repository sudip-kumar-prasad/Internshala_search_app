import { createContext, useState, useContext, useCallback } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [profile, setProfile] = useState('');
  const [location, setLocation] = useState('');
  const [wfh, setWfh] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [stipend, setStipend] = useState(0);
  const [duration, setDuration] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const clearAllFilters = useCallback(() => {
    setProfile('');
    setLocation('');
    setWfh(false);
    setPartTime(false);
    setStipend(0);
    setDuration('');
    setSearchQuery('');
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
    clearAllFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);

