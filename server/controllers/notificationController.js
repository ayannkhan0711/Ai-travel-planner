let inMemoryNotifications = [
  {
    _id: 'notif-1',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    type: 'bookingConfirm',
    title: 'Booking Confirmed: Emirates First Class A380',
    message: 'Your suite 02A on flight EK 202 to Paris (CDG) is confirmed. Chauffeur drive scheduled.',
    bookingId: '660e1a2b3c4d5e6f7a8b9c11',
    isRead: false,
    sentVia: 'email',
    actionUrl: '/bookings/660e1a2b3c4d5e6f7a8b9c11',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    _id: 'notif-2',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    type: 'priceAlert',
    title: 'Price Advantage Alert: Panling Overwater Villas',
    message: 'Rates dropped by 18% for your selected travel dates in late November.',
    isRead: false,
    sentVia: 'push',
    actionUrl: '/search/hotels?city=Panling',
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    _id: 'notif-3',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    type: 'flightDelay',
    title: 'Gate Assigned: VIP Salon 4',
    message: 'Terminal 1 security fast-track pass active. Boarding commences at 09:45.',
    isRead: true,
    sentVia: 'sms',
    actionUrl: '/bookings',
    createdAt: new Date(Date.now() - 86400000),
  },
];

// @desc Get all notifications
// @route GET /api/notifications/list
exports.listNotifications = async (req, res) => {
  res.status(200).json({
    success: true,
    count: inMemoryNotifications.length,
    notifications: inMemoryNotifications,
  });
};

// @desc Get unread notifications
// @route GET /api/notifications/unread
exports.getUnreadNotifications = async (req, res) => {
  const unread = inMemoryNotifications.filter((n) => !n.isRead);
  res.status(200).json({
    success: true,
    count: unread.length,
    notifications: unread,
  });
};

// @desc Mark notification as read
// @route PUT /api/notifications/:id/read
exports.markAsRead = async (req, res) => {
  const notif = inMemoryNotifications.find((n) => n._id === req.params.id);
  if (notif) notif.isRead = true;

  res.status(200).json({
    success: true,
    message: 'Notification marked as read',
    notification: notif,
  });
};

// @desc Update notification preferences
// @route POST /api/notifications/settings
exports.updateSettings = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Notification dispatch preferences saved',
    preferences: req.body,
  });
};

// @desc Set price drop alert
// @route POST /api/notifications/price-alert
exports.setPriceAlert = async (req, res) => {
  const { origin, destination, targetPrice, email } = req.body;
  const alertNotif = {
    _id: `notif-pa-${Date.now()}`,
    userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
    type: 'priceAlert',
    title: `Price Watch Enabled: ${origin || 'Origin'} to ${destination || 'Destination'}`,
    message: `Monitoring premium fares below $${targetPrice || '3,000'}. Instant SMS & Push dispatched upon drop.`,
    isRead: false,
    sentVia: 'email',
    createdAt: new Date(),
  };
  inMemoryNotifications.unshift(alertNotif);

  res.status(201).json({
    success: true,
    message: `Price drop alert activated for ${origin} ➔ ${destination}.`,
    alert: alertNotif,
  });
};

// @desc Enable flight delay alerts
// @route POST /api/notifications/flight-alert
exports.enableFlightAlert = async (req, res) => {
  const { flightNumber, phone } = req.body;
  res.status(200).json({
    success: true,
    message: `Real-time radar delay notifications enabled for Flight ${flightNumber || 'EK 202'}. Updates pushed to ${phone || 'registered device'}.`,
  });
};

// @desc Delete notification
// @route DELETE /api/notifications/:id
exports.deleteNotification = async (req, res) => {
  inMemoryNotifications = inMemoryNotifications.filter((n) => n._id !== req.params.id);
  res.status(200).json({
    success: true,
    message: 'Notification dismissed',
  });
};
