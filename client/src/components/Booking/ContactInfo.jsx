import React from 'react';

export default function ContactInfo({ contactInfo, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...contactInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E6D3] pb-3">
        <h4 className="font-serif text-lg font-bold text-luxury-dark">
          Concierge Contact & Flight Notifications
        </h4>
        <p className="text-xs text-gray-500">
          Where our personal concierge will transmit your encrypted tickets and flight radar alerts.
        </p>
      </div>

      <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
            Primary Email Address
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-luxury-brown"
            placeholder="guest@voyagerluxe.com"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
            Mobile Number for Priority WhatsApp & SMS Updates
          </label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-luxury-brown"
            placeholder="+1 (212) 555-0199"
            required
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs text-luxury-dark cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-luxury-brown focus:ring-luxury-brown"
            />
            <span>Receive 24/7 personal WhatsApp butler liaison for this booking</span>
          </label>
        </div>
      </div>
    </div>
  );
}
