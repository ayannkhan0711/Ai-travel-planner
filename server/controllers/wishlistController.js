let inMemoryWishlist = [
  {
    _id: 'wish-1',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    title: 'The Grand Palace Hernur',
    type: 'hotel',
    location: 'Hernur, Riviera',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    priceEstimate: '$850 / night',
    rating: 4.95,
    addedAt: new Date(),
  },
  {
    _id: 'wish-2',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    title: 'Panling Overwater Lagoon Sanctuary',
    type: 'destination',
    location: 'Panling',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    priceEstimate: '$1,120 / night',
    rating: 4.92,
    addedAt: new Date(),
  },
  {
    _id: 'wish-3',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    title: 'Vouke Glacier Private Chalet',
    type: 'hotel',
    location: 'Vouke Alpine',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    priceEstimate: '$1,450 / night',
    rating: 4.97,
    addedAt: new Date(),
  },
];

// @desc Add item to wishlist
// @route POST /api/wishlist/add
exports.addToWishlist = async (req, res) => {
  const item = {
    _id: `wish-${Date.now()}`,
    userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
    ...req.body,
    addedAt: new Date(),
  };
  inMemoryWishlist.unshift(item);

  res.status(201).json({
    success: true,
    message: 'Added to your bespoke travel wishlist',
    item,
  });
};

// @desc Get all wishlist items
// @route GET /api/wishlist/list
exports.getWishlist = async (req, res) => {
  res.status(200).json({
    success: true,
    count: inMemoryWishlist.length,
    wishlist: inMemoryWishlist,
  });
};

// @desc Remove from wishlist
// @route DELETE /api/wishlist/:id
exports.removeFromWishlist = async (req, res) => {
  inMemoryWishlist = inMemoryWishlist.filter((w) => w._id !== req.params.id);
  res.status(200).json({ success: true, message: 'Removed from wishlist' });
};

// @desc Move to active trip
// @route POST /api/wishlist/:id/move-to-trip
exports.moveToTrip = async (req, res) => {
  const item = inMemoryWishlist.find((w) => w._id === req.params.id);
  res.status(200).json({
    success: true,
    message: `"${item ? item.title : 'Item'}" added to your active trip itinerary.`,
    tripId: req.body.tripId || 'trip-001',
  });
};
