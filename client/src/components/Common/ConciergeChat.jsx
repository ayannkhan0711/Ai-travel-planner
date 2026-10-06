import React, { useState, useRef, useEffect } from 'react';
import { useUIContext } from '../../context/UIContext';
import { useNavigate } from 'react-router-dom';

const QUICK_PROMPTS = [
  'Curate a 7-day Amalfi & Capri private yacht retreat',
  'Compare Emirates First Class vs Singapore Suites',
  'Arrange helicopter transfer to Courchevel 1850',
  'What are the visa rules for France & Switzerland?',
  'Top 3 Michelin dining spots in Tokyo with private salons',
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'concierge',
    name: 'Aurelia',
    title: 'Senior Private Client Concierge',
    time: 'Just now',
    text: 'Greetings. I am Aurelia, your dedicated Voyager Luxe AI Concierge. Whether arranging private aviation across continents, securing presidential suites at the George V, or orchestrating bespoke multi-modal journeys, how may I curate your travels today?',
  },
];

export default function ConciergeChat() {
  const { isChatOpen, setIsChatOpen, toggleChat } = useUIContext();
  const navigate = useNavigate();

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI concierge response engine
    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('amalfi') || q.includes('capri') || q.includes('yacht')) {
        reply = 'Magnificent choice. For an Amalfi & Capri escape, I recommend flying privately into Naples (NAP) where your chauffeur will transfer you to the Marina di Stabia. Board a 120ft Sanlorenzo motor yacht charter cruising past Positano’s pastel cliffs, anchoring at the Faraglioni rocks with sunset champagne service. Would you like me to populate this into your Itinerary Studio?';
      } else if (q.includes('emirates') || q.includes('singapore') || q.includes('flight')) {
        reply = 'Both represent the pinnacle of commercial aviation: Emirates A380 offers an enclosed private suite with an onboard shower spa and Dom Pérignon 2013, while Singapore Suites features a standalone double bed and Lalique crystal tableware. For overnight transatlantic legs, Singapore Suites provides superior sleeping comfort, whereas Emirates excels in onboard social lounge prestige.';
      } else if (q.includes('courchevel') || q.includes('helicopter') || q.includes('ski')) {
        reply = 'We partner with Helisecurity for direct alpine transfers. An Airbus H130 twin-engine helicopter from Geneva (GVA) directly to Courchevel Altiport takes just 28 minutes, bypassing all mountain switchbacks. Our luggage chase van will deliver your Louis Vuitton trunks directly to your chalet.';
      } else if (q.includes('visa') || q.includes('passport') || q.includes('rule')) {
        reply = 'For US, UK, and EU passport holders entering the Schengen Zone (France, Switzerland, Italy), 90 days visa-free access is granted. Please ensure your passport has at least 6 months validity beyond departure date. You can also run a full check in our Travel Intel tab.';
      } else if (q.includes('michelin') || q.includes('tokyo') || q.includes('dining')) {
        reply = 'In Tokyo, I recommend: 1) Sukiyabashi Jiro (Roppongi) for private master-counter omakase, 2) Quintessence (3-Star modern French gastronomy by Chef Shuzo Kishida), and 3) Ryugin for avant-garde kaiseki in Hibiya. As a Voyager Luxe Centurion guest, our Tokyo bureau holds guaranteed weekly reservations for all three.';
      } else {
        reply = `Certainly. I have logged your request: "${query}". Our team is synchronizing with our private aviation dispatchers and palace hotel concierges to present the finest options within your dossier.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'concierge',
          name: 'Aurelia',
          title: 'Senior Private Client Concierge',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: reply,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Badge when closed */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-luxury-brown to-luxury-brownDark text-white shadow-2xl hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group border border-luxury-gold/40"
          aria-label="Open Concierge Chat"
        >
          <div className="relative">
            <span className="text-xl">✦</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-luxury-gold rounded-full animate-ping" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-serif font-bold tracking-wider">AURELIA CONCIERGE</p>
            <p className="text-[10px] text-luxury-goldLight">24/7 AI Private Client Desk</p>
          </div>
        </button>
      )}

      {/* Slide-out / Pop-up Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-luxury-beige flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark p-4 px-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-luxury-goldLight/20 border border-luxury-gold flex items-center justify-center text-luxury-goldLight font-serif font-bold text-lg">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-luxury-brown rounded-full" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base tracking-wide flex items-center gap-1.5">
                  Aurelia
                  <span className="text-[10px] uppercase font-sans font-semibold px-2 py-0.5 rounded-full bg-luxury-gold/30 text-luxury-goldLight border border-luxury-gold/40">
                    AI Concierge
                  </span>
                </h3>
                <p className="text-[11px] text-white/70">Voyager Luxe Private Client Reserve</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages(INITIAL_MESSAGES)}
                className="text-white/60 hover:text-white text-xs p-1"
                title="Reset conversation"
              >
                ↻
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/70 hover:text-white text-lg p-1 transition-colors"
                title="Minimize Concierge"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-luxury-offwhite text-left">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-semibold text-luxury-muted">
                      {isUser ? 'You' : m.name}
                    </span>
                    <span className="text-[9px] text-gray-400">· {m.time}</span>
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-luxury-brown text-white rounded-br-none'
                        : 'bg-white text-luxury-dark border border-luxury-beige/80 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-luxury-brown bg-white border border-luxury-beige px-3 py-2 rounded-2xl w-fit animate-pulse">
                <span className="text-sm">✦</span>
                <span className="text-[11px] font-medium">Aurelia is curating recommendations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 px-3 bg-white border-t border-luxury-beige/60 overflow-x-auto flex gap-1.5 scrollbar-hide">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp)}
                className="text-[10px] bg-luxury-cream text-luxury-brown hover:bg-luxury-beige border border-luxury-beige px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
              >
                ✦ {qp}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-luxury-border flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Aurelia about private jets, palaces, itineraries..."
              className="flex-1 bg-luxury-offwhite border border-luxury-border rounded-xl px-3.5 py-2.5 text-xs text-luxury-dark focus:outline-none focus:ring-1 focus:ring-luxury-brown"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="btn-primary py-2.5 px-4 text-xs font-semibold rounded-xl disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
