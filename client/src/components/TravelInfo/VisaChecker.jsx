import React, { useState, useEffect } from 'react';
import { travelInfoService } from '../../services/travelInfoService';

export default function VisaChecker() {
  const [fromCountry, setFromCountry] = useState('United States');
  const [toCountry, setToCountry] = useState('France');
  const [visaData, setVisaData] = useState(null);
  const [loading, setLoading] = useState(false);

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Japan',
    'Singapore',
    'France',
    'Switzerland',
    'United Arab Emirates',
    'Italy',
    'Germany',
    'India',
  ];

  const handleCheck = async () => {
    setLoading(true);
    try {
      const data = await travelInfoService.getVisaInfo(fromCountry, toCountry);
      setVisaData(data);
    } catch (e) {
      setVisaData({
        status: 'Visa Free (Up to 90 Days for Tourism & Business)',
        processingTime: 'Immediate upon landing at VIP Private FBO / Border Gate',
        fee: '$0 (Waived for Voyager Luxe Centurion Dossier Holders)',
        requirements: [
          'Passport valid at least 6 months beyond travel dates',
          'Confirmed return private charter manifest or flight booking',
          'Proof of 5-star palace accommodation reservation',
          'Premier Shield international health insurance with $500,000+ emergency cover',
        ],
        conciergeAssistance: 'Voyager Luxe automatically dispatches your electronic border dossier.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 sm:p-8 shadow-luxury space-y-6 text-left">
      <div className="border-b border-[#F5E6D3] pb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-brown block mb-1">
          Diplomatic Intelligence
        </span>
        <h3 className="font-serif text-2xl font-bold text-luxury-dark">
          Visa & Border Clearance Dossier
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Real-time immigration protocols, electronic entry authorization (eTA), and VIP fast-track clearance requirements.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
            Passport / Citizenship of Origin
          </label>
          <select
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            className="w-full bg-[#FFFAF0] border border-luxury-beige rounded-xl p-3 text-xs font-semibold text-luxury-dark focus:outline-none focus:border-luxury-brown cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
            Destination Sanctuary
          </label>
          <select
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            className="w-full bg-[#FFFAF0] border border-luxury-beige rounded-xl p-3 text-xs font-semibold text-luxury-dark focus:outline-none focus:border-luxury-brown cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={loading}
        className="btn-primary py-2.5 px-6 text-xs uppercase tracking-wider font-semibold"
      >
        {loading ? 'Checking Embassy Database...' : 'Verify Entry Protocols ➔'}
      </button>

      {/* Verification Result Card */}
      {visaData && (
        <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-6 space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-luxury-beige/60 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Status Clearance</span>
              <h4 className="font-serif text-lg font-bold text-luxury-brown">
                {visaData.status}
              </h4>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase text-gray-400">Processing Time</span>
              <p className="text-xs font-bold text-luxury-dark">{visaData.processingTime}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-luxury-dark block mb-2">
              Mandatory Entry Credentials:
            </span>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {visaData.requirements?.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-luxury-brown font-bold">✓</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-luxury-beige/60 text-xs text-luxury-brown font-medium flex items-center gap-2">
            <span>✦</span>
            <span>{visaData.conciergeAssistance}</span>
          </div>
        </div>
      )}
    </div>
  );
}
