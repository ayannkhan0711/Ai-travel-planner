import React from 'react';
import { storage } from '../../utils/localStorage';

export default function SearchHistory({ onSelect }) {
  const history = storage.get('search_history', [
    { destination: 'Hernur Riviera', date: '2026-11-20', mode: 'Unified Multi-Modal' },
    { destination: 'Panling Atoll', date: '2026-12-05', mode: 'Private Suite' },
    { destination: 'Paris Historic Reserve', date: '2026-11-15', mode: 'High-Speed Rail + Palace' },
  ]);

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs py-2">
      <span className="text-gray-400 font-medium">Recent explorations:</span>
      {history.slice(0, 4).map((h, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect && onSelect(h)}
          className="px-2.5 py-1 rounded-full bg-white border border-[#E8DCCF] text-luxury-dark hover:border-luxury-brown hover:text-luxury-brown transition-colors text-[11px]"
        >
          {h.destination} · {h.mode}
        </button>
      ))}
    </div>
  );
}
