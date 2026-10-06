const mongoose = require('mongoose');

const travelDocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    documentType: {
      type: String,
      required: true,
      enum: ['passport', 'visa', 'ticket', 'insurance', 'vaccination', 'id_card'],
    },
    documentNumber: {
      type: String,
      trim: true,
    },
    issuingCountry: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    documentFile: {
      type: String, // Secure URL or base64 representation
      required: true,
    },
    fileName: String,
    fileSize: Number,
    verified: {
      type: Boolean,
      default: false,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TravelDocument', travelDocumentSchema);
