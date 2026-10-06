import React, { useState } from 'react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import ActivityPicker from './ActivityPicker';

export default function DayPlanner({ day, onAddActivity, onRemoveActivity }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury space-y-5">
      {/* Day Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F5E6D3] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-luxury-brown">
              Day {day.dayNumber}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">{formatDate(day.date)}</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-luxury-dark mt-0.5">
            {day.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{day.notes}</p>
        </div>

        {day.weather && (
          <div className="flex items-center gap-2 bg-[#FFFAF0] border border-luxury-beige px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span className="text-base">{day.weather.icon || '☀️'}</span>
            <div className="text-left">
              <span className="text-xs font-bold text-luxury-dark">{day.weather.temp}°C</span>
              <span className="block text-[10px] text-gray-500">{day.weather.condition}</span>
            </div>
          </div>
        )}
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3">
        {day.activities?.length > 0 ? (
          day.activities.map((act, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between p-3.5 rounded-xl bg-luxury-offwhite border border-gray-100 hover:border-luxury-beige transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-luxury-brown mt-0.5">
                  {act.time || '10:00 AM'}
                </span>
                <div>
                  <p className="text-xs font-bold text-luxury-dark">{act.title}</p>
                  <span className="text-[10px] text-gray-400 capitalize">
                    {act.category || 'Sightseeing'} {act.location ? `· ${act.location}` : ''}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-xs text-luxury-brown">
                  {formatCurrency(act.cost || 0)}
                </span>
                {onRemoveActivity && (
                  <button
                    onClick={() => onRemoveActivity(day.dayNumber, act.title)}
                    className="text-gray-400 hover:text-red-500 text-xs"
                    title="Remove activity"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic py-2">
            No scheduled activities for this day yet. Add excursions or private dining reservations below.
          </p>
        )}
      </div>

      {/* Add Activity Trigger */}
      <div>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="btn-outline w-full py-2 text-xs font-semibold uppercase tracking-wider"
        >
          {showPicker ? 'Close Activity Browser ▲' : '+ Add Curated Activity / Dining ▼'}
        </button>

        {showPicker && (
          <div className="mt-4 p-4 bg-[#FFFAF0] border border-luxury-beige rounded-2xl animate-fade-in">
            <ActivityPicker
              onAddActivity={(act) => {
                onAddActivity(day.dayNumber, act);
                setShowPicker(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
