import React from 'react';
import MultiModalSearch from '../components/Search/MultiModalSearch';
import SavedSearches from '../components/Search/SavedSearches';
import SearchHistory from '../components/Search/SearchHistory';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-luxury-brown via-luxury-brownDark to-luxury-brown py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-luxury-goldLight blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-luxury-copper blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">Intelligent Multi-Modal</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Search Everything, <span className="bg-gradient-to-r from-luxury-goldLight to-luxury-gold bg-clip-text text-transparent">Everywhere</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Flights, hotels, trains, buses, taxis, and experiences — all in one unified search.
            Compare across 500+ providers instantly.
          </p>
        </div>
      </section>

      {/* Main Search Interface */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 relative z-20">
        <div className="luxury-card p-6 md:p-8">
          <MultiModalSearch />
        </div>
      </section>

      {/* Saved & History */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="luxury-card p-6">
          <h2 className="font-serif text-xl font-bold text-luxury-dark mb-4 flex items-center gap-2">
            <span className="text-luxury-gold">★</span> Saved Searches
          </h2>
          <SavedSearches />
        </div>
        <div className="luxury-card p-6">
          <h2 className="font-serif text-xl font-bold text-luxury-dark mb-4 flex items-center gap-2">
            <span className="text-luxury-brown">⏱</span> Recent Searches
          </h2>
          <SearchHistory />
        </div>
      </section>

      {/* Quick Tips */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="glass-card p-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-luxury-dark mb-4">Travel Search Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { icon: '🔍', title: 'Flexible Dates', desc: 'Toggle flexible dates to find cheaper fares across ±3 days' },
              { icon: '🔄', title: 'Multi-Modal', desc: 'Compare train vs flight for routes under 500 miles — often faster door-to-door' },
              { icon: '💡', title: 'Bundle & Save', desc: 'Combine flight + hotel for up to 30% savings on luxury packages' },
            ].map((tip) => (
              <div key={tip.title} className="text-center">
                <span className="text-3xl block mb-2">{tip.icon}</span>
                <h4 className="font-semibold text-luxury-dark text-sm">{tip.title}</h4>
                <p className="text-xs text-luxury-muted mt-1">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
