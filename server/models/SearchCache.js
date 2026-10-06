const mongoose = require('mongoose');

const searchCacheSchema = new mongoose.Schema(
  {
    searchHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['multi-modal', 'flight', 'hotel', 'train', 'bus', 'taxi', 'activity', 'restaurant'],
      required: true,
    },
    queryParams: {
      type: mongoose.Schema.Types.Mixed,
    },
    results: {
      type: Array,
      default: [],
    },
    expiryTime: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SearchCache', searchCacheSchema);
