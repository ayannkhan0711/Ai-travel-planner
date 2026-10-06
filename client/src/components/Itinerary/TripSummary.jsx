import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function TripSummary({ trip, onShare, onPrint }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/trips/shared/${trip.shareCode || 'HERNUR-LUXE-2026'}`;
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5E6D3] pb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-brown block">
            Executive Itinerary Dossier
          </span>
          <h2 className="font-serif text-2xl font-bold text-luxury-dark mt-0.5">
            {trip.tripName}
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-lg">{trip.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="btn-outline py-2 px-3 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>🔗</span>
            <span>{copied ? 'Share Link Copied!' : 'Share Itinerary'}</span>
          </button>
          <button
            onClick={onPrint || (() => window.print())}
            className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>🖨</span>
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-[#FFFAF0] p-3 rounded-xl border border-luxury-beige">
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Commencement</span>
          <span className="font-bold text-luxury-dark">{formatDate(trip.startDate)}</span>
        </div>
        <div className="bg-[#FFFAF0] p-3 rounded-xl border border-luxury-beige">
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Conclusion</span>
          <span className="font-bold text-luxury-dark">{formatDate(trip.endDate)}</span>
        </div>
        <div className="bg-[#FFFAF0] p-3 rounded-xl border border-luxury-beige">
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Total Duration</span>
          <span className="font-bold text-luxury-dark">{trip.days?.length || 7} Days & Nights</span>
        </div>
        <div className="bg-[#FFFAF0] p-3 rounded-xl border border-luxury-beige">
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Estimated Investment</span>
          <span className="font-serif font-bold text-luxury-brown text-sm">
            {formatCurrency(trip.totalEstimatedCost || 19800)}
          </span>
        </div>
      </div>
    </div>
  );
}
