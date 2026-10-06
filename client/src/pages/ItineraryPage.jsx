import React, { useState } from 'react';
import ItineraryBuilder from '../components/Itinerary/ItineraryBuilder';
import DayPlanner from '../components/Itinerary/DayPlanner';
import BudgetTracker from '../components/Itinerary/BudgetTracker';
import PackingChecklist from '../components/Itinerary/PackingChecklist';
import TripSummary from '../components/Itinerary/TripSummary';
import ItineraryMap from '../components/Itinerary/ItineraryMap';

const ITINERARY_TABS = [
  { key: 'builder', label: 'Itinerary Builder', icon: '🗺️' },
  { key: 'day', label: 'Day Planner', icon: '📅' },
  { key: 'map', label: 'Route Map', icon: '📍' },
  { key: 'budget', label: 'Budget & Ledger', icon: '💰' },
  { key: 'packing', label: 'Packing Dossier', icon: '🧳' },
  { key: 'summary', label: 'Executive Summary', icon: '📋' },
];

const INITIAL_TRIP = {
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
    {
      dayNumber: 3,
      date: new Date('2026-11-22'),
      title: 'Private Catamaran Cruise to Secret Panling Cove',
      notes: 'Depart Hernur marina for private cove swimming and lobster lunch on board.',
      weather: { temp: 25, condition: 'Gentle Breeze', icon: '⛵' },
      activities: [
        { title: 'Exclusive Lagoon Snorkeling & Coral Conservation', category: 'adventure', time: '10:30 AM', cost: 700 },
        { title: 'Michelin Star Chef Dinner Under the Stars', category: 'dining', time: '07:30 PM', cost: 950 },
      ],
    },
  ],
};

export default function ItineraryPage() {
  const [activeTab, setActiveTab] = useState('builder');
  const [trip, setTrip] = useState(INITIAL_TRIP);
  const [selectedDayNum, setSelectedDayNum] = useState(1);

  const handleAddActivity = (dayNumber, activity) => {
    setTrip((prev) => {
      const updatedDays = prev.days.map((d) => {
        if (d.dayNumber === dayNumber) {
          return { ...d, activities: [...(d.activities || []), activity] };
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

  const activeDay = trip.days.find((d) => d.dayNumber === selectedDayNum) || trip.days[0];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'builder':
        return <ItineraryBuilder initialTrip={trip} />;
      case 'day':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {trip.days.map((day) => (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayNum(day.dayNumber)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDayNum === day.dayNumber
                      ? 'bg-luxury-brown text-white shadow-luxury'
                      : 'bg-white text-luxury-dark border border-luxury-beige hover:border-luxury-brown'
                  }`}
                >
                  Day {day.dayNumber} · {day.title.substring(0, 24)}...
                </button>
              ))}
            </div>
            <DayPlanner
              day={activeDay}
              onAddActivity={handleAddActivity}
              onRemoveActivity={handleRemoveActivity}
            />
          </div>
        );
      case 'map':
        return (
          <div className="max-w-5xl mx-auto">
            <ItineraryMap destinations={trip.destinations} />
          </div>
        );
      case 'budget':
        return (
          <div className="max-w-3xl mx-auto">
            <BudgetTracker budget={trip.budget} />
          </div>
        );
      case 'packing':
        return (
          <div className="max-w-4xl mx-auto">
            <PackingChecklist destination={trip.destinations[0]?.city || 'Hernur'} />
          </div>
        );
      case 'summary':
        return (
          <div className="max-w-4xl mx-auto">
            <TripSummary trip={trip} />
          </div>
        );
      default:
        return <ItineraryBuilder initialTrip={trip} />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Header */}
      <section className="bg-gradient-to-br from-luxury-brown via-luxury-brownDark to-luxury-brown py-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-luxury-goldLight blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-luxury-copper blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">Plan Your Perfect Trip</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Itinerary <span className="bg-gradient-to-r from-luxury-goldLight to-luxury-gold bg-clip-text text-transparent">Studio</span>
          </h1>
          <p className="text-white/60 max-w-xl">
            Build day-by-day itineraries with activities, transport connections, budget tracking, and packing checklists — all in one place.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-5 relative z-20">
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide bg-white rounded-2xl shadow-luxury p-1.5 border border-luxury-beige">
          {ITINERARY_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-luxury-brown text-white shadow-luxury font-semibold'
                  : 'text-luxury-muted hover:text-luxury-brown hover:bg-luxury-beigeLight'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </section>
    </div>
  );
}
