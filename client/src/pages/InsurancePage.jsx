import React, { useState } from 'react';

const PLANS = [
  {
    name: 'Essential',
    price: '$49',
    period: 'per trip',
    color: 'border-gray-200',
    badge: '',
    features: [
      'Trip cancellation up to $5,000',
      'Medical coverage up to $50,000',
      'Baggage loss up to $1,000',
      '24/7 emergency hotline',
      'Flight delay compensation',
    ],
  },
  {
    name: 'Premium',
    price: '$129',
    period: 'per trip',
    color: 'border-luxury-brown',
    badge: 'Most Popular',
    features: [
      'Trip cancellation up to $25,000',
      'Medical coverage up to $250,000',
      'Baggage loss up to $5,000',
      '24/7 concierge assistance',
      'Flight delay + hotel compensation',
      'Rental car damage coverage',
      'Adventure sports coverage',
    ],
  },
  {
    name: 'Centurion',
    price: '$299',
    period: 'per trip',
    color: 'border-luxury-gold',
    badge: 'Best Value',
    features: [
      'Trip cancellation — unlimited',
      'Medical coverage — unlimited',
      'Baggage loss up to $15,000',
      'Private medical evacuation',
      'Cancel for any reason (CFAR)',
      'Luxury hotel rebooking guarantee',
      'Concierge legal assistance',
      'Adventure + extreme sports',
      'Trip interruption — full refund',
    ],
  },
];

const CLAIMS_HISTORY = [
  { id: 'CLM-49281', type: 'Flight Delay', amount: '$350', status: 'Approved', date: 'Sep 2026' },
  { id: 'CLM-38172', type: 'Lost Baggage', amount: '$1,200', status: 'Processing', date: 'Aug 2026' },
  { id: 'CLM-27463', type: 'Medical', amount: '$4,800', status: 'Approved', date: 'Jul 2026' },
];

export default function InsurancePage() {
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 right-20 w-80 h-80 rounded-full bg-luxury-goldLight blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">Travel Protection</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Insurance & <span className="bg-gradient-to-r from-luxury-goldLight to-luxury-gold bg-clip-text text-transparent">Protection</span>
          </h1>
          <p className="text-white/60 max-w-xl">
            Comprehensive coverage for the discerning traveler. Choose a plan that matches your journey.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-luxury-dark">Choose Your Protection</h2>
          <p className="text-luxury-muted mt-2">All plans include instant policy issuance and worldwide coverage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`luxury-card p-7 relative transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                selectedPlan === plan.name ? 'ring-2 ring-luxury-brown shadow-luxury-hover' : ''
              } ${plan.color} border-2`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-white text-[10px] font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-serif text-2xl font-bold text-luxury-dark mt-2">{plan.name}</h3>
              <div className="mt-3 mb-6">
                <span className="font-serif text-4xl font-bold text-luxury-brown">{plan.price}</span>
                <span className="text-luxury-muted text-sm ml-1">/{plan.period}</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-luxury-dark">
                    <span className="text-luxury-gold mt-0.5">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedPlan === plan.name
                    ? 'btn-gold'
                    : 'btn-outline'
                }`}
              >
                {selectedPlan === plan.name ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Claims History */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="luxury-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-luxury-dark">Claims History</h2>
            <button className="btn-primary py-2 px-5 text-sm">File New Claim</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-luxury-border">
                  <th className="text-left py-3 text-xs font-semibold text-luxury-muted uppercase tracking-wider">Claim ID</th>
                  <th className="text-left py-3 text-xs font-semibold text-luxury-muted uppercase tracking-wider">Type</th>
                  <th className="text-left py-3 text-xs font-semibold text-luxury-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 text-xs font-semibold text-luxury-muted uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 text-xs font-semibold text-luxury-muted uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {CLAIMS_HISTORY.map((claim) => (
                  <tr key={claim.id} className="border-b border-gray-50 hover:bg-luxury-beigeLight/50 transition-colors">
                    <td className="py-3 font-medium text-luxury-dark">{claim.id}</td>
                    <td className="py-3 text-luxury-muted">{claim.type}</td>
                    <td className="py-3 font-semibold text-luxury-dark">{claim.amount}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-semibold ${
                        claim.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-3 text-luxury-muted">{claim.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
