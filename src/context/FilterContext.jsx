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
  const [preferences, setPreferences] = useState(false);
  const [inMyCity, setInMyCity] = useState(false);

  // Additional filter states
  const [startDate, setStartDate] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [jobOffer, setJobOffer] = useState(false);
  const [fastResponse, setFastResponse] = useState(false);
  const [earlyApplicant, setEarlyApplicant] = useState(false);
  const [forWomen, setForWomen] = useState(false);

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
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);

