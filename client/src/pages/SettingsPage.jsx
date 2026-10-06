import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (212) 555-0142',
    dateOfBirth: '1988-06-15',
    nationality: 'United States',
  });

  const [preferences, setPreferences] = useState({
    currency: 'USD',
    language: 'English',
    seatPreference: 'window',
    mealPreference: 'no-preference',
    cabinClass: 'business',
    hotelStarMin: 4,
    notifications: { email: true, push: true, sms: false, marketing: false },
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (activeSection === 'profile') {
      updateUser({ firstName: profile.firstName, lastName: profile.lastName, email: profile.email });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SECTIONS = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'preferences', label: 'Travel Preferences', icon: '⚙️' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'billing', label: 'Payment Methods', icon: '💳' },
  ];

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">Account</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2">
            Dossier & Settings
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="luxury-card p-4 sticky top-28">
              <nav className="space-y-1">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.key}
                    onClick={() => setActiveSection(sec.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeSection === sec.key
                        ? 'bg-luxury-brown text-white shadow-luxury'
                        : 'text-luxury-muted hover:text-luxury-brown hover:bg-luxury-beigeLight'
                    }`}
                  >
                    <span>{sec.icon}</span>
                    {sec.label}
                  </button>
                ))}
                <div className="border-t border-luxury-border my-3" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span>🚪</span>
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {/* Success Toast */}
            {saved && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 text-sm text-emerald-700 font-medium animate-fade-in">
                ✅ Settings saved successfully
              </div>
            )}

            {activeSection === 'profile' && (
              <div className="luxury-card p-6 md:p-8 animate-fade-in">
                <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Personal Information</h2>
                <form onSubmit={handleSave} className="space-y-5">
                  {/* Profile Photo */}
                  <div className="flex items-center gap-6 mb-6">
                    <img
                      src={user?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-luxury-gold"
                    />
                    <div>
                      <button type="button" className="btn-outline py-2 px-4 text-xs">Change Photo</button>
                      <p className="text-[11px] text-luxury-muted mt-1">JPG, PNG or WEBP. Max 5MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Date of Birth</label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Nationality</label>
                      <input
                        type="text"
                        value={profile.nationality}
                        onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold py-3 px-8 text-sm mt-4">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div className="luxury-card p-6 md:p-8 animate-fade-in">
                <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Travel Preferences</h2>
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Preferred Currency</label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CHF">CHF (Fr)</option>
                        <option value="AED">AED (د.إ)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      >
                        <option value="English">English</option>
                        <option value="French">Français</option>
                        <option value="German">Deutsch</option>
                        <option value="Spanish">Español</option>
                        <option value="Japanese">日本語</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Seat Preference</label>
                      <select
                        value={preferences.seatPreference}
                        onChange={(e) => setPreferences({ ...preferences, seatPreference: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      >
                        <option value="window">Window</option>
                        <option value="aisle">Aisle</option>
                        <option value="middle">Middle</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Cabin Class Default</label>
                      <select
                        value={preferences.cabinClass}
                        onChange={(e) => setPreferences({ ...preferences, cabinClass: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      >
                        <option value="economy">Economy</option>
                        <option value="premium">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First Class</option>
                        <option value="private">Private Jet</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Meal Preference</label>
                      <select
                        value={preferences.mealPreference}
                        onChange={(e) => setPreferences({ ...preferences, mealPreference: e.target.value })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      >
                        <option value="no-preference">No Preference</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="halal">Halal</option>
                        <option value="kosher">Kosher</option>
                        <option value="gluten-free">Gluten Free</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Minimum Hotel Stars</label>
                      <select
                        value={preferences.hotelStarMin}
                        onChange={(e) => setPreferences({ ...preferences, hotelStarMin: parseInt(e.target.value) })}
                        className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                      >
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars Only</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn-gold py-3 px-8 text-sm mt-4">
                    Save Preferences
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="luxury-card p-6 md:p-8 animate-fade-in">
                <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Booking confirmations, travel alerts, and updates' },
                    { key: 'push', label: 'Push Notifications', desc: 'Real-time flight status, gate changes, and delays' },
                    { key: 'sms', label: 'SMS Notifications', desc: 'Critical alerts via text message' },
                    { key: 'marketing', label: 'Marketing & Offers', desc: 'Exclusive deals, flash sales, and new destinations' },
                  ].map((notif) => (
                    <div key={notif.key} className="flex items-center justify-between p-4 bg-luxury-cream rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-luxury-dark">{notif.label}</p>
                        <p className="text-xs text-luxury-muted mt-0.5">{notif.desc}</p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences({
                            ...preferences,
                            notifications: {
                              ...preferences.notifications,
                              [notif.key]: !preferences.notifications[notif.key],
                            },
                          })
                        }
                        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                          preferences.notifications[notif.key] ? 'bg-luxury-brown' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                            preferences.notifications[notif.key] ? 'left-[26px]' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="luxury-card p-6 md:p-8 animate-fade-in">
                <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div className="p-5 bg-luxury-cream rounded-xl">
                    <h3 className="font-semibold text-luxury-dark text-sm mb-3">Change Password</h3>
                    <div className="space-y-3">
                      <input type="password" placeholder="Current password" className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30" />
                      <input type="password" placeholder="New password" className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30" />
                      <input type="password" placeholder="Confirm new password" className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30" />
                      <button className="btn-primary py-2.5 px-6 text-sm">Update Password</button>
                    </div>
                  </div>
                  <div className="p-5 bg-luxury-cream rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-luxury-dark text-sm">Two-Factor Authentication</h3>
                      <p className="text-xs text-luxury-muted mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn-outline py-2 px-5 text-xs">Enable 2FA</button>
                  </div>
                  <div className="p-5 bg-red-50 rounded-xl border border-red-200">
                    <h3 className="font-semibold text-red-700 text-sm">Danger Zone</h3>
                    <p className="text-xs text-red-600 mt-1">Once you delete your account, there is no going back.</p>
                    <button className="mt-3 px-5 py-2 rounded-xl border border-red-300 text-red-700 text-xs font-medium hover:bg-red-100 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'billing' && (
              <div className="luxury-card p-6 md:p-8 animate-fade-in">
                <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Payment Methods</h2>
                <div className="space-y-4">
                  {[
                    { type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
                    { type: 'Amex', last4: '3782', expiry: '09/27', isDefault: false },
                    { type: 'PayPal', last4: 'j***@email.com', expiry: '', isDefault: false },
                  ].map((card, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-luxury-cream rounded-xl">
                      <div className="w-12 h-8 bg-luxury-brown rounded-md flex items-center justify-center text-white text-xs font-bold">
                        {card.type}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-luxury-dark">{card.type} •••• {card.last4}</p>
                        {card.expiry && <p className="text-[11px] text-luxury-muted">Expires {card.expiry}</p>}
                      </div>
                      {card.isDefault && <span className="badge-gold text-[10px]">Default</span>}
                      <button className="text-xs text-luxury-brown hover:underline">Edit</button>
                    </div>
                  ))}
                  <button className="btn-outline w-full py-3 text-sm mt-4">
                    + Add Payment Method
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
