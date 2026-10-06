let inMemoryTickets = [
  {
    _id: 'tkt-001',
    ticketNumber: 'VL-CONC-9021',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    subject: 'Private Vineyard Dinner Reservation in Famling',
    status: 'assigned',
    priority: 'VIP Concierge Priority',
    assignedConcierge: 'Henri de Montmirail (Senior Swiss Concierge)',
    messages: [
      {
        sender: 'Julian Vanderbilt',
        role: 'user',
        text: 'Could your team reserve a table for two at Château Famling overlooking the sunset vineyard on November 23rd?',
        timestamp: new Date('2026-10-04T14:30:00Z'),
      },
      {
        sender: 'Henri de Montmirail',
        role: 'concierge',
        text: 'Monsieur Vanderbilt, it would be my pleasure. I have secured the private belvedere table with the cellar master reserve pairing.',
        timestamp: new Date('2026-10-04T15:10:00Z'),
      },
    ],
    createdAt: new Date('2026-10-04T14:30:00Z'),
  },
];

// @desc Create support ticket
// @route POST /api/support/ticket
exports.createTicket = async (req, res) => {
  const ticket = {
    _id: `tkt-${Date.now()}`,
    ticketNumber: `VL-CONC-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
    subject: req.body.subject || 'Bespoke Travel Inquiry',
    status: 'assigned',
    priority: 'VIP Priority',
    assignedConcierge: 'Clara Delacroix (Voyager Elite Concierge)',
    messages: [
      {
        sender: `${req.user?.firstName || 'Distinguished'} ${req.user?.lastName || 'Guest'}`,
        role: 'user',
        text: req.body.message || 'I have a request regarding my upcoming journey.',
        timestamp: new Date(),
      },
      {
        sender: 'Clara Delacroix',
        role: 'concierge',
        text: 'Bonjour! I have received your request and am personally attending to it right away.',
        timestamp: new Date(Date.now() + 1000),
      },
    ],
    createdAt: new Date(),
  };

  inMemoryTickets.unshift(ticket);

  res.status(201).json({
    success: true,
    message: 'Your request has been routed to your personal luxury concierge.',
    ticket,
  });
};

// @desc Get ticket details
// @route GET /api/support/tickets/:id
exports.getTicket = async (req, res) => {
  const ticket = inMemoryTickets.find((t) => t._id === req.params.id || t.ticketNumber === req.params.id) || inMemoryTickets[0];
  res.status(200).json({ success: true, ticket });
};

// @desc Add message to ticket
// @route POST /api/support/ticket/:id/message
exports.addMessage = async (req, res) => {
  const ticket = inMemoryTickets.find((t) => t._id === req.params.id || t.ticketNumber === req.params.id) || inMemoryTickets[0];
  const userMsg = {
    sender: req.user?.firstName || 'Guest',
    role: 'user',
    text: req.body.message,
    timestamp: new Date(),
  };
  ticket.messages.push(userMsg);

  // Auto-respond with concierge AI
  setTimeout(() => {
    ticket.messages.push({
      sender: ticket.assignedConcierge || 'Concierge Desk',
      role: 'concierge',
      text: 'Acknowledged. We are coordinating with the local estate management and will confirm shortly.',
      timestamp: new Date(),
    });
  }, 1000);

  res.status(200).json({ success: true, message: 'Message sent', messages: ticket.messages });
};

// @desc Get FAQ list
// @route GET /api/support/faq
exports.getFAQ = async (req, res) => {
  const faqs = [
    {
      q: 'How does Voyager Luxe unify multi-modal travel bookings?',
      a: 'We aggregate private aviation, commercial First & Business suites, high-speed luxury rail, and chauffeured transfers into a single seamless itinerary with guaranteed connection protection.',
    },
    {
      q: 'What is the cancellation policy on luxury accommodations and private suites?',
      a: 'Most Voyager Luxe bookings offer complimentary cancellation or date alterations up to 24–48 hours prior to departure, backed by our Premier Shield protection.',
    },
    {
      q: 'Can Voyager Luxe arrange private jet charters and helicopter transfers?',
      a: 'Yes. Our integrated Rome2Rio and GetTransfer multi-modal engine provides instant pricing and booking for private turboprops, midsize jets, and airport helipads.',
    },
    {
      q: 'How do loyalty points and airline miles integrate?',
      a: 'Voyager Luxe allows automatic two-way synchronization with Emirates Skywards, Marriott Bonvoy, Singapore KrisFlyer, and others so you earn both platform points and carrier tier miles simultaneously.',
    },
  ];

  res.status(200).json({ success: true, faqs });
};

// @desc Get emergency contact
// @route POST /api/support/emergency-contact
exports.getEmergencyContact = async (req, res) => {
  const { country = 'France' } = req.body;
  res.status(200).json({
    success: true,
    country,
    contacts: {
      voyager24x7DirectLine: '+1 (800) 869-LUXE (Direct to Senior Butler Desk)',
      emergencyMedicalEvac: '+41 22 819 9000 (Geneva Operations Command)',
      localPoliceEmergency: '112 (European Emergency Number)',
      privateSecurityEscort: 'Available on 20-minute notice in all Tier 1 metropolises',
    },
  });
};
