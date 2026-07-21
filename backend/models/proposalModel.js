const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    company: {
      type: String,
      default: '',
      trim: true
    },
    service: {
      type: String,
      default: 'Civil Infrastructure',
      trim: true
    },
    scale: {
      type: String,
      default: '$50k - $250k',
      trim: true
    },
    notes: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'contacted', 'archived'],
      default: 'pending'
    }
  },
  {
    timestamps: true // Automatically maintains createdAt and updatedAt dates
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);
