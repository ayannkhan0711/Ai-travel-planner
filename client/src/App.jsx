import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Loading from './components/Common/Loading';
import ErrorBoundary from './components/Common/ErrorBoundary';
import ConciergeChat from './components/Common/ConciergeChat';

// Lazy-load pages for code-splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ItineraryPage = lazy(() => import('./pages/ItineraryPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TravelGuidesPage = lazy(() => import('./pages/TravelGuidesPage'));
const InsurancePage = lazy(() => import('./pages/InsurancePage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-luxury-offwhite">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/travel-guides" element={<TravelGuidesPage />} />
              <Route path="/insurance" element={<InsurancePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ConciergeChat />
      </div>
    </ErrorBoundary>
  );
}
