import { useState } from 'react';
import { searchService } from '../services/searchService';

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // all, flights, trains, buses, hotels, taxis

  const executeSearch = async (tab, params) => {
    setLoading(true);
    setError(null);
    try {
      let data = [];
      if (tab === 'all') data = await searchService.searchMultiModal(params);
      else if (tab === 'flights') data = await searchService.searchFlights(params);
      else if (tab === 'hotels') data = await searchService.searchHotels(params);
      else if (tab === 'trains') data = await searchService.searchTrains(params);
      else if (tab === 'buses') data = await searchService.searchBuses(params);
      else if (tab === 'taxis') data = await searchService.searchTaxis(params);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, setResults, loading, error, activeTab, setActiveTab, executeSearch };
};
