import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';

export default function ActivityPicker({ onAddActivity }) {
  const [category, setCategory] = useState('all');

  const activitiesPool = [
    { title: 'Private Helicopter Coastal Tour', category: 'transport', cost: 1200, time: '11:00 AM', desc: 'Bespoke aerial panorama of Riviera cliffs' },
    { title: 'Sunset Riva Yacht & Champagne Charter', category: 'sightseeing', cost: 1500, time: '05:30 PM', desc: 'Private captain with vintage caviar service' },
    { title: 'Michelin 3-Star Tasting Menu & Wine Pairing', category: 'dining', cost: 680, time: '08:00 PM', desc: 'Chef counter table reserved for Voyager guests' },
    { title: 'Guerlain Luxury Thermal Spa Ritual', category: 'wellness', cost: 450, time: '02:00 PM', desc: '3-hour private rejuvenation & thermal baths' },
    { title: 'After-Hours Museum & Private Vault Tour', category: 'culture', cost: 950, time: '07:00 PM', desc: 'Head curator guided walkthrough' },
  ];

  const filtered = category === 'all' ? activitiesPool : activitiesPool.filter((a) => a.category === category);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-gray-100 pb-2 overflow-x-auto text-xs">
        {['all', 'dining', 'sightseeing', 'wellness', 'transport', 'culture'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
              category === cat
                ? 'bg-luxury-brown text-white'
                : 'bg-luxury-beigeLight text-luxury-brown hover:bg-luxury-beige'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {filtered.map((act, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#FFFAF0] border border-luxury-beige rounded-xl flex items-center justify-between hover:border-luxury-brown transition-all"
          >
            <div>
              <p className="text-xs font-bold text-luxury-dark">{act.title}</p>
              <p className="text-[11px] text-gray-500">{act.desc}</p>
              <span className="text-[10px] text-luxury-brown font-semibold">{act.time}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-xs text-luxury-brown">
                {formatCurrency(act.cost)}
              </span>
              <button
                onClick={() => onAddActivity && onAddActivity(act)}
                className="btn-primary py-1 px-3 text-[11px] font-semibold"
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
