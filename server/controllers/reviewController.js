const Review = require('../models/Review');

let inMemoryReviews = [
  {
    _id: 'rev-001',
    userId: { _id: 'usr-1', firstName: 'Eleanor', lastName: 'Cavendish', profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    targetId: 'htl-001',
    destination: 'Hernur',
    type: 'hotel',
    rating: 5,
    title: 'The Most Exquisite Cliffside Haven in Europe',
    description: 'From the moment our private helicopter touched down, the staff anticipated our every wish. The Guerlain spa rituals and private rooftop sommelier dinner exceeded even our highest expectations.',
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80',
    ],
    helpful: 48,
    verified: true,
    createdAt: new Date('2026-09-12'),
  },
  {
    _id: 'rev-002',
    userId: { _id: 'usr-2', firstName: 'Lord Arthur', lastName: 'Sterling', profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    targetId: 'FL-EK-202',
    destination: 'Paris',
    type: 'flight',
    rating: 5,
    title: 'Flawless First Class Suite & Chauffeur Transfer',
    description: 'Smooth, silent, and wonderfully decadent. The Dom Pérignon 2012 paired with caviar at 38,000 feet was sublime. The Mercedes-Maybach was waiting on the tarmac upon arrival.',
    photos: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80'],
    helpful: 32,
    verified: true,
    createdAt: new Date('2026-09-28'),
  },
];

// @desc Create review
// @route POST /api/reviews/create
exports.createReview = async (req, res, next) => {
  try {
    const newRev = {
      _id: `rev-${Date.now()}`,
      userId: {
        _id: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
        firstName: req.user?.firstName || 'Julian',
        lastName: req.user?.lastName || 'Vanderbilt',
        profilePhoto: req.user?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      bookingId: req.body.bookingId,
      targetId: req.body.targetId || req.body.hotelId || 'general',
      destination: req.body.destination || 'Panling',
      type: req.body.type || 'hotel',
      rating: req.body.rating || 5,
      title: req.body.title || 'Exceptional experience',
      description: req.body.description || 'Seamless luxury service.',
      photos: req.body.photos || [],
      helpful: 0,
      verified: true,
      createdAt: new Date(),
    };

    inMemoryReviews.unshift(newRev);

    res.status(201).json({
      success: true,
      message: 'Thank you for contributing your refined critique to the Voyager Luxe circle.',
      review: newRev,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get reviews for booking
// @route GET /api/reviews/:bookingId
exports.getBookingReviews = async (req, res) => {
  const reviews = inMemoryReviews.filter((r) => r.bookingId === req.params.bookingId);
  res.status(200).json({ success: true, count: reviews.length, reviews });
};

// @desc Get destination reviews
// @route GET /api/reviews/destination/:destination
exports.getDestinationReviews = async (req, res) => {
  const reviews = inMemoryReviews.filter(
    (r) => r.destination.toLowerCase() === req.params.destination.toLowerCase()
  );
  res.status(200).json({
    success: true,
    destination: req.params.destination,
    count: reviews.length,
    reviews: reviews.length > 0 ? reviews : inMemoryReviews,
  });
};

// @desc Get hotel reviews
// @route GET /api/reviews/hotel/:hotelId
exports.getHotelReviews = async (req, res) => {
  const reviews = inMemoryReviews.filter((r) => r.targetId === req.params.hotelId);
  res.status(200).json({
    success: true,
    hotelId: req.params.hotelId,
    count: reviews.length,
    reviews: reviews.length > 0 ? reviews : inMemoryReviews,
  });
};

// @desc Update review
// @route PUT /api/reviews/:id
exports.updateReview = async (req, res) => {
  const rev = inMemoryReviews.find((r) => r._id === req.params.id);
  if (rev) {
    Object.assign(rev, req.body);
  }
  res.status(200).json({ success: true, message: 'Review updated', review: rev });
};

// @desc Delete review
// @route DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  inMemoryReviews = inMemoryReviews.filter((r) => r._id !== req.params.id);
  res.status(200).json({ success: true, message: 'Review removed' });
};

// @desc Mark review as helpful
// @route POST /api/reviews/:id/helpful
exports.markHelpful = async (req, res) => {
  const rev = inMemoryReviews.find((r) => r._id === req.params.id);
  if (rev) {
    rev.helpful += 1;
  }
  res.status(200).json({ success: true, helpfulCount: rev ? rev.helpful : 1 });
};
