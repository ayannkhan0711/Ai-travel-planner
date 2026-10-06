import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { useUIContext } from '../../context/UIContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { isChatOpen, toggleChat, currency, setCurrency } = useUIContext();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore', path: '/' },
    { label: 'Multi-Modal Search', path: '/search' },
    { label: 'Itineraries', path: '/itinerary' },
    { label: 'Travel Intel', path: '/travel-guides' },
    { label: 'Protection', path: '/insurance' },
    { label: 'Concierge SOS', path: '/support' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#F5E6D3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl text-luxury-brown group-hover:scale-110 transition-transform duration-300">✦</span>
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-luxury-brown block leading-none">
                VOYAGER LUXE
              </span>
              <span className="text-[9px] uppercase tracking-widest text-luxury-brownLight font-medium">
                Premier AI Travel Aggregator
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-wide transition-colors font-medium ${
                    isActive
                      ? 'text-luxury-brown font-semibold border-b-2 border-luxury-brown pb-1'
                      : 'text-luxury-dark hover:text-luxury-brown'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-4">
            
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#FFFAF0] border border-luxury-beige text-luxury-brown text-xs rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:ring-1 focus:ring-luxury-brown cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CHF">CHF (Fr)</option>
              <option value="AED">AED (د.إ)</option>
            </select>

            {/* Notification Bell */}
            <Link
              to="/dashboard"
              className="relative p-2 rounded-full hover:bg-luxury-beigeLight text-luxury-brown transition-colors"
              title="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-luxury-brown rounded-full ring-2 ring-white"></span>
              )}
            </Link>

            {/* Concierge Live Chat Trigger */}
            <button
              onClick={toggleChat}
              className="p-2 rounded-full hover:bg-luxury-beigeLight text-luxury-brown transition-colors"
              title="Concierge Live Assistant"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 pl-2 focus:outline-none"
                >
                  <img
                    src={user.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={user.firstName}
                    className="w-9 h-9 rounded-full object-cover border border-luxury-brown"
                  />
                  <span className="hidden sm:inline-block text-xs font-semibold text-luxury-dark">
                    {user.firstName}
                  </span>
                  <svg className="w-3.5 h-3.5 text-luxury-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileDropdownOpen && (
                  <div
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                    className="absolute right-0 mt-3 w-56 bg-white border border-[#F5E6D3] rounded-xl shadow-luxury py-2 animate-fade-in z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-luxury-dark">{user.firstName} {user.lastName}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[10px] bg-luxury-cream text-luxury-brown px-2 py-0.5 rounded-full font-medium border border-luxury-beige">
                          Centurion Member
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-luxury-beigeLight hover:text-luxury-brown"
                    >
                      Member Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-luxury-beigeLight hover:text-luxury-brown"
                    >
                      Dossier & Settings
                    </Link>
                    <Link
                      to="/itinerary"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-luxury-beigeLight hover:text-luxury-brown"
                    >
                      Curated Itineraries
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/settings" className="btn-primary py-2 px-4 text-xs font-semibold">
                Sign In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-luxury-brown"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#F5E6D3] bg-[#FAFAF8] space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-luxury-dark hover:bg-luxury-beigeLight rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
