import { useState, useEffect } from 'react';
import countryService from '../services/countries';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(async () => {
    try {
      const country = await countryService.getCountry(name);
      setCountry(country);
    } catch {
      setCountry(null);
    }
  }, [name]);

  // if country found, setCountry to that data
  return country;
};
