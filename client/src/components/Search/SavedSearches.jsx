import React, { useState, useEffect } from 'react';
import { searchService } from '../../services/searchService';
import { formatDate } from '../../utils/formatters';

export default function SavedSearches({ onSelectSearch }) {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchService.getSavedSearches().then((data) => {
      setSearches(data);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  if (!searches.length) return null;

  return (
    <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-5 mb-8">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-serif text-sm font-bold text-luxury-brown uppercase tracking-wider flex items-center gap-1.5">
          <span>✦</span>
          <span>Saved Journey Searches</span>
        </h4>
        <span className="text-xs text-gray-500 font-medium">{searches.length} Saved</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {searches.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelectSearch && onSelectSearch(s)}
            className="bg-white border border-[#E8DCCF] rounded-xl p-3.5 hover:border-luxury-brown cursor-pointer transition-all hover:shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-luxury-dark">{s.title || `${s.origin} to ${s.destination}`}</p>
              <p className="text-[11px] text-gray-500">
                {s.origin} ➔ {s.destination} · {s.cabinClass || 'First'}
              </p>
            </div>
            <button className="text-xs text-luxury-brown font-semibold hover:underline">
              Load ➔
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
