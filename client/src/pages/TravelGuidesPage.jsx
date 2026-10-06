import React, { useState } from 'react';
import VisaChecker from '../components/TravelInfo/VisaChecker';
import TravelAdvisories from '../components/TravelInfo/TravelAdvisories';
import HealthRequirements from '../components/TravelInfo/HealthRequirements';

const GUIDE_TABS = [
  { key: 'visa', label: 'Visa Checker', icon: '🛂' },
  { key: 'advisories', label: 'Travel Advisories', icon: '⚠️' },
  { key: 'health', label: 'Health Requirements', icon: '🏥' },
  { key: 'guides', label: 'Destination Guides', icon: '📖' },
];

const DESTINATION_GUIDES = [
  {
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Mar-May, Sep-Nov',
    currency: 'JPY (¥)',
    language: 'Japanese',
    tips: 'Carry cash — many places don\'t accept cards. Get a Japan Rail Pass for intercity travel.',
  },
  {
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Apr-Jun, Sep-Oct',
    currency: 'EUR (€)',
    language: 'French',
    tips: 'Book museums in advance. Avoid tourist-trap restaurants near major landmarks.',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Apr-Oct',
    currency: 'IDR (Rp)',
    language: 'Indonesian',
    tips: 'Rent a scooter for flexibility. Visit temples before 9am to avoid crowds.',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Nov-Mar',
    currency: 'AED (د.إ)',
    language: 'Arabic, English',
    tips: 'Dress modestly in public areas. Friday brunch is a local institution.',
  },
];

export default function TravelGuidesPage() {
  const [activeTab, setActiveTab] = useState('visa');

  const renderContent = () => {
    switch (activeTab) {
      case 'visa':
        return <VisaChecker />;
      case 'advisories':
        return <TravelAdvisories />;
      case 'health':
        return <HealthRequirements />;
      case 'guides':
        return <GuidesSection />;
      default:
        return <VisaChecker />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">Travel Intelligence</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Travel <span className="bg-gradient-to-r from-luxury-goldLight to-luxury-gold bg-clip-text text-transparent">Guides & Intel</span>
          </h1>
          <p className="text-white/60 max-w-xl">
            Visa requirements, travel advisories, health guidelines, and insider destination guides — everything for informed travel.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-luxury-border bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {GUIDE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-luxury-brown text-luxury-brown'
                  : 'border-transparent text-luxury-muted hover:text-luxury-brown'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </section>
    </div>
  );
}

function GuidesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {DESTINATION_GUIDES.map((guide) => (
        <div key={guide.name} className="luxury-card overflow-hidden group">
          <div className="relative h-48 overflow-hidden">
            <img
              src={guide.image}
              alt={guide.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-5">
              <h3 className="font-serif text-2xl font-bold text-white">{guide.name}</h3>
              <p className="text-white/70 text-sm">{guide.country}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Best Time</p>
                <p className="text-sm font-semibold text-luxury-dark mt-0.5">{guide.bestTime}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Currency</p>
                <p className="text-sm font-semibold text-luxury-dark mt-0.5">{guide.currency}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Language</p>
                <p className="text-sm font-semibold text-luxury-dark mt-0.5">{guide.language}</p>
              </div>
            </div>
            <div className="bg-luxury-cream rounded-xl p-4">
              <p className="text-xs text-luxury-muted leading-relaxed">
                <span className="font-semibold text-luxury-brown">Insider Tip:</span> {guide.tips}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
