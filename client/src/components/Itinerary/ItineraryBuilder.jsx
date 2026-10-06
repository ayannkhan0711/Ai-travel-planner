import React, { useState } from 'react';
import TripSummary from './TripSummary';
import DayPlanner from './DayPlanner';
import BudgetTracker from './BudgetTracker';
import PackingChecklist from './PackingChecklist';
import ItineraryMap from './ItineraryMap';

export default function ItineraryBuilder({ initialTrip }) {
  const [trip, setTrip] = useState(
    initialTrip || {
      _id: 'trip-001',
      tripName: 'Grand Tour of Hernur & Panling Riviera',
      description: 'An exclusive 7-day retreat traversing the golden cliffs of Hernur, ancient vineyards of Famling, and private villas in Panling.',
      startDate: new Date('2026-11-20'),
      endDate: new Date('2026-11-27'),
      budget: { total: 25000, spent: 12450, currency: 'USD' },
      shareCode: 'HERNUR-LUXE-2026',
      totalEstimatedCost: 19800,
      destinations: [
        { city: 'Hernur', country: 'Riviera', stayDurationDays: 3 },
        { city: 'Panling', country: 'Coastal Reserve', stayDurationDays: 4 },
      ],
      days: [
        {
          dayNumber: 1,
          date: new Date('2026-11-20'),
          title: 'Arrival in Hernur & Welcome Champagne Reception',
          notes: 'Chauffeur meets at VIP terminal. Evening yacht cruise along golden coves.',
          weather: { temp: 24, condition: 'Golden Sunset', icon: '🌅' },
          activities: [
            { title: 'VIP Helipad Landing & Maybach Transfer', category: 'transport', time: '02:00 PM', cost: 650 },
            { title: 'Sunset Private Riva Boat Charter', category: 'sightseeing', time: '05:30 PM', cost: 1200 },
          ],
        },
        {
          dayNumber: 2,
          date: new Date('2026-11-21'),
          title: 'Private Cliffside Spa & Vintage Wine Cellars',
          notes: 'Full day rejuvenation and private cellar tasting.',
          weather: { temp: 23, condition: 'Clear Sky', icon: '☀️' },
          activities: [
            { title: 'Guerlain Bespoke Facial & Thermal Bath', category: 'wellness', time: '10:00 AM', cost: 450 },
            { title: 'Centennial Grand Cru Cellar Tour with Head Sommelier', category: 'culture', time: '02:30 PM', cost: 850 },
          ],
        },
      ],
    }
  );

  const [activeDayNumber, setActiveDayNumber] = useState(1);

  const handleAddActivity = (dayNumber, activity) => {
    setTrip((prev) => {
      const updatedDays = prev.days.map((d) => {
        if (d.dayNumber === dayNumber) {
          return { ...d, activities: [...d.activities, activity] };
        }
        return d;
      });
      return {
        ...prev,
        days: updatedDays,
        budget: { ...prev.budget, spent: prev.budget.spent + (activity.cost || 0) },
      };
    });
  };

  const handleRemoveActivity = (dayNumber, activityTitle) => {
    setTrip((prev) => {
      const updatedDays = prev.days.map((d) => {
        if (d.dayNumber === dayNumber) {
          return {
            ...d,
            activities: d.activities.filter((a) => a.title !== activityTitle),
          };
        }
        return d;
      });
      return { ...prev, days: updatedDays };
    });
  };

  const handleAddDay = () => {
    const nextNum = trip.days.length + 1;
    const newDay = {
      dayNumber: nextNum,
      date: new Date(new Date(trip.startDate).getTime() + (nextNum - 1) * 86400000),
      title: `Day ${nextNum}: Coastal Leisure & Private Dining`,
      notes: 'Dedicated leisure time with personal butler concierge.',
      weather: { temp: 24, condition: 'Sunny', icon: '☀️' },
      activities: [],
    };
    setTrip((prev) => ({ ...prev, days: [...prev.days, newDay] }));
    setActiveDayNumber(nextNum);
  };

  const currentDay = trip.days.find((d) => d.dayNumber === activeDayNumber) || trip.days[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      {/* Executive Summary */}
      <TripSummary trip={trip} />

      {/* Route Map Visual */}
      <ItineraryMap destinations={trip.destinations} />

      {/* Main Day Timeline & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Day Selector Timeline & Budget */}
        <div className="space-y-6">
          <div className="bg-white border border-[#F5E6D3] rounded-2xl p-5 shadow-luxury">
            <div className="flex items-center justify-between mb-4 border-b border-[#F5E6D3] pb-3">
              <h4 className="font-serif text-sm font-bold text-luxury-dark uppercase tracking-wider">
                Journey Days
              </h4>
              <button
                onClick={handleAddDay}
                className="text-xs text-luxury-brown font-semibold hover:underline"
              >
                + Add Day
              </button>
            </div>

            <div className="space-y-2">
              {trip.days.map((day) => (
                <button
                  key={day.dayNumber}
                  onClick={() => setActiveDayNumber(day.dayNumber)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    activeDayNumber === day.dayNumber
                      ? 'border-luxury-brown bg-[#FFFAF0] shadow-sm font-semibold'
                      : 'border-transparent hover:bg-luxury-offwhite text-gray-600'
                  }`}
                >
                  <div>
                    <span className="text-xs text-luxury-brown font-bold block">
                      Day {day.dayNumber}
                    </span>
                    <span className="text-[11px] text-luxury-dark truncate block max-w-[180px]">
                      {day.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 bg-white border px-2 py-0.5 rounded-full">
                    {day.activities.length} Events
                  </span>
                </button>
              ))}
            </div>
          </div>

          <BudgetTracker budget={trip.budget} />
        </div>

        {/* Center / Right Column: Active Day Planner & Smart Packing */}
        <div className="lg:col-span-2 space-y-6">
          <DayPlanner
            day={currentDay}
            onAddActivity={handleAddActivity}
            onRemoveActivity={handleRemoveActivity}
          />

          <PackingChecklist destination={trip.destinations[0]?.city || 'Hernur'} />
        </div>
      </div>
    </div>
  );
}
