# ✦ VOYAGER LUXE — Premier AI Luxury Travel Aggregator Platform

> **Unifying private aviation, commercial first suites, palace hotels, scenic heritage rail, private chauffeurs, and Michelin retreats in one bespoke itinerary.**

---

## 🏛 Platform Overview

**Voyager Luxe** is a premier luxury travel aggregator built on the **MERN** stack (MongoDB, Express, React, Node.js) with Tailwind CSS and pure JavaScript (no TypeScript). 

Unlike standard travel engines, Voyager Luxe provides an **intelligent multi-modal search** across 6 distinct travel modes simultaneously, eliminating the need to toggle between disjointed airline portals, hotel aggregators, and railway sites. Every journey is preserved within an **Executive Itinerary Dossier** with automated boarding passes, door-to-door transfer coordinates, and 24/7 AI Concierge support.

---

## 🎨 Luxury Design System & Color Palette

The interface is tailored to high-net-worth aesthetics, incorporating warm heritage tones, subtle gold illumination, and elegant serif typography.

| Token | Hex Code | Visual Application |
|---|---|---|
| **Primary Brown** | `#8B7355` | Brand accents, key CTA buttons, active tabs |
| **Warm Bronze / Brown** | `#A0826D` | Borders, secondary headings, badges |
| **Warm Beige** | `#F5E6D3` | Card borders, subtle divider lines |
| **Cream** | `#FFFAF0` | Card interiors, badge backgrounds, pill highlights |
| **Off-White** | `#FAFAF8` | Page background canvas |
| **Deep Charcoal** | `#2D2D2D` | Primary body typography & contrast footer |
| **Soft Gold** | `#C5A059` | Gradients, stars, crests, and glows |

### Typography
- **Headings**: Cormorant Garamond, Cinzel, and Playfair Display (Google Fonts)
- **Body & Data**: Montserrat and Inter (Clean sans-serif clarity)

---

## 🚀 Key Modules & Capabilities

### 1. Multi-Modal Search Engine (`/search` & `/results`)
- **Flights**: First Class commercial suites (Emirates A380 Gamechanger, Singapore Suites, Air France La Première) & VistaJet private charter.
- **Palaces & Stays**: 5-Star historic palaces (Four Seasons George V Paris, Ritz Paris, The Connaught).
- **Railways**: Venice Simplon-Orient-Express, Eurostar Business Premier, and Glacier Express Excellence Class.
- **Royale Cruisers**: High-speed luxury double-decker sleeper coaches with Starlink WiFi.
- **Chauffeur Privé**: Rolls-Royce Phantom VIII, Mercedes-Maybach S 680, and Riva Aquarama yacht transfers.
- **Curated Experiences**: After-hours Versailles Hall of Mirrors private visits, Mont Blanc glacier tastings, and bespoke perfume masterclasses in Grasse.
- **Dynamic Filtering & Sorting**: Filter by maximum fare, non-stop direct status, VIP chauffeur inclusion, cabin tier, and palace rating.

### 2. Aurelia — 24/7 AI Concierge Assistant
- Accessible site-wide via the floating golden badge or navigation bar.
- Interactive conversational AI providing flight comparisons, alpine helicopter charters, visa protocols, and Michelin 3-Star private dining bookings.
- Quick prompts for instant recommendations.

### 3. Itinerary Studio (`/itinerary`)
- **Day Planner**: Day-by-day timeline with time slots, cost breakdown, and activity pickers.
- **Scenic Route Map**: Visual elevation route connecting itinerary destinations.
- **Budget & Escrow Ledger**: Track total investment, committed spend, and remaining liquidity.
- **Packing Dossier**: Smart weather-aware packing suggestions (evening wear, formal attire, electronics).
- **Trip Summary Dossier**: Shareable guest link and one-click print/PDF dossier generation.

### 4. 7-Step VIP Checkout & Boarding Pass (`/booking`)
- Traveler Details, Contact Credentials, Dossier Sync, Centurion Travel Protection, Grand Total Ledger, Payment Authorization, and Official Boarding Pass generation.
- Real-time Boarding Pass with QR code, terminal, gate, and seat details ready for print or mobile presentation.

### 5. Member Dashboard & Reservation Management (`/dashboard`)
- Real-time radar radar status for flight & chauffeur tracking.
- Seating & suite modification (switch to window port, starboard view, or center double bed).
- 100% money-back cancellation and refund processor.
- Centurion loyalty miles & points overview.

### 6. Travel Intelligence & Protection (`/travel-guides` & `/insurance`)
- **Visa Requirements Checker**: Instant border protocol lookup by nationality and destination.
- **Health & Advisories**: Vaccine standards, emergency hotlines, and security ratings.
- **Centurion Travel Shield**: Essential ($49), Premium ($129), and Centurion ($299) insurance coverage with claims history ledger.

---

## 🛠 Project Structure

```
├── client/
│   ├── index.html                  # HTML5 template with Google Serif fonts
│   ├── package.json                # React 18, Vite 5, Tailwind CSS 3, Lucide
│   ├── tailwind.config.js          # Tailored luxury brown & gold palette
│   └── src/
│       ├── App.jsx                 # Routes, code-splitting, ConciergeChat mount
│       ├── index.jsx               # React DOM root & Context Providers
│       ├── index.css               # Global CSS & Tailwind imports
│       ├── components/
│       │   ├── Common/             # Navbar, Footer, Loading, Modal, ConciergeChat, ErrorBoundary
│       │   ├── Search/             # MultiModalSearch, SearchFilters, SavedSearches, SearchHistory
│       │   ├── Results/            # Flight, Hotel, Train, Bus, Taxi, Activity cards & sorting
│       │   ├── Booking/            # BookingFlow, Summary, PassengerDetails, TicketDownload, ManageBooking
│       │   ├── Itinerary/          # ItineraryBuilder, DayPlanner, ItineraryMap, BudgetTracker, PackingChecklist
│       │   └── TravelInfo/         # VisaChecker, TravelAdvisories, HealthRequirements
│       ├── context/                # AuthContext, BookingContext, NotificationContext, UIContext
│       ├── hooks/                  # useAuth, useBooking, useNotifications, useSearch
│       ├── pages/                  # HomePage, SearchPage, ResultsPage, BookingPage, ItineraryPage, DashboardPage, SettingsPage, etc.
│       ├── services/               # Axios API wrappers (auth, search, booking, payment)
│       └── utils/                  # Formatters, constants, local storage helpers
│
└── server/
    ├── server.js                   # Express application, security headers, route mounting
    ├── package.json                # Express, Mongoose, JWT, Nodemailer, PDFKit
    ├── config/                     # MongoDB connection & in-memory/Redis cache provider
    ├── controllers/                # Search, Booking, Trip, Auth, Insurance, Loyalty, Support, Admin controllers
    ├── middleware/                 # Rate limiting, JWT verification, logging, error handlers
    ├── models/                     # User, Booking, Trip, Insurance, Loyalty, Review, Notification models
    ├── routes/                     # 13 Express REST router definitions
    ├── services/                   # Amadeus API, Rome2Rio multi-modal, PDF ticket generator, Email
    └── scripts/                    # Database migration & seed data scripts
```

---

## 💻 Running the Application

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

2. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Starting the Application
- **Run both client and server concurrently** (from root directory):
  ```bash
  npm run dev
  ```
- **Or run server independently**:
  ```bash
  npm run server
  # Server runs on http://localhost:5000 (API Health: http://localhost:5000/api/health)
  ```
- **Or run client independently**:
  ```bash
  cd client
  npm run dev
  # Client runs on http://localhost:5173
  ```

---

## 🔒 Security & Performance Features
- **Helmet HTTP Security**: Standard secure header protection.
- **JWT Authentication**: Bearer tokens with automated refresh token rotation.
- **API Rate Limiter**: 100 requests per 15-minute window to safeguard aggregator routes.
- **Smart In-Memory Caching with TTL**: Caches multi-modal query results for 30 minutes to reduce API latency.
- **Graceful Offline Fallbacks**: If MongoDB or external APIs are unreachable, in-memory mock datasets guarantee a seamless demonstration experience.
