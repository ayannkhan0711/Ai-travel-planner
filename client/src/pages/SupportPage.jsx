import React, { useState } from 'react';

const FAQ_DATA = [
  {
    q: 'How do I cancel or modify a booking?',
    a: 'Navigate to Dashboard → Bookings, select the booking you wish to modify, and click "Manage Booking". Most bookings can be modified up to 24 hours before departure. Cancellation policies vary by provider.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, Amex, Diners Club), PayPal, Apple Pay, Google Pay, and bank transfers for high-value bookings. Cryptocurrency payments available for Centurion members.',
  },
  {
    q: 'How does the multi-modal search work?',
    a: 'Our intelligent search engine queries 500+ providers simultaneously across flights, hotels, trains, buses, taxis, and experiences. Results are aggregated, deduplicated, and ranked by our proprietary algorithm for best value.',
  },
  {
    q: 'Is travel insurance mandatory?',
    a: 'While not mandatory, we strongly recommend purchasing travel protection for all international trips. Our insurance partners offer comprehensive plans starting at $49 per trip.',
  },
  {
    q: 'How do loyalty points work?',
    a: 'Earn Voyager Luxe points on every booking (1 point per $1 spent). Points can be redeemed for upgrades, free nights, lounge access, and exclusive experiences. Centurion members earn 3x points.',
  },
];

export default function SupportPage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'general', message: '', priority: 'medium' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-luxury-goldLight blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">24/7 Concierge</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Concierge <span className="bg-gradient-to-r from-luxury-goldLight to-luxury-gold bg-clip-text text-transparent">Support</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Our dedicated concierge team is available around the clock to assist with any travel needs or emergencies.
          </p>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📞', title: 'Emergency Hotline', desc: '+1 (800) VOYAGER-SOS', sub: 'Available 24/7', color: 'bg-red-50 border-red-200' },
            { icon: '💬', title: 'Live Chat', desc: 'Average response: 30 seconds', sub: 'Chat with Concierge', color: 'bg-emerald-50 border-emerald-200' },
            { icon: '✉️', title: 'Email Support', desc: 'concierge@voyagerluxe.com', sub: 'Response within 2 hours', color: 'bg-blue-50 border-blue-200' },
          ].map((option) => (
            <div key={option.title} className={`luxury-card p-6 text-center ${option.color} border`}>
              <span className="text-3xl block mb-3">{option.icon}</span>
              <h3 className="font-serif text-lg font-bold text-luxury-dark">{option.title}</h3>
              <p className="text-sm font-semibold text-luxury-brown mt-1">{option.desc}</p>
              <p className="text-xs text-luxury-muted mt-1">{option.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQ */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="luxury-card overflow-hidden">
                <button
                  onClick={() => setActiveQuestion(activeQuestion === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-luxury-beigeLight/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-luxury-dark pr-4">{faq.q}</span>
                  <span className={`text-luxury-brown transition-transform duration-300 flex-shrink-0 ${activeQuestion === i ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeQuestion === i && (
                  <div className="px-5 pb-4 animate-fade-in">
                    <p className="text-sm text-luxury-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Submit a Support Ticket</h2>
          <div className="luxury-card p-6">
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <span className="text-5xl block mb-4">✅</span>
                <h3 className="font-serif text-xl font-bold text-luxury-dark">Ticket Submitted</h3>
                <p className="text-sm text-luxury-muted mt-2">Our concierge team will respond within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                    className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Category</label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                      className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Issue</option>
                      <option value="payment">Payment & Refunds</option>
                      <option value="technical">Technical Support</option>
                      <option value="emergency">Travel Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Priority</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                      className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High — Urgent</option>
                      <option value="critical">Critical — Emergency</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-luxury-dark block mb-1.5">Message</label>
                  <textarea
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    rows="5"
                    className="w-full border border-luxury-border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-luxury-brown/30"
                    required
                  />
                </div>
                <button type="submit" className="btn-gold w-full py-3.5">
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
