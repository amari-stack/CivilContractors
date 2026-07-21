const Proposal = require('../models/proposalModel');

// @desc    Submit a new site proposal
// @route   POST /api/proposal
// @access  Public
const submitProposal = async (req, res, next) => {
  try {
    const { name, email, phone, company, service, scale, notes } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Name, email, and phone number are required.'
      });
    }

    const mongoUri = process.env.MONGODB_URL || process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(200).json({
        success: true,
        fallback: true,
        ticketId: `LA-${Math.floor(10000 + Math.random() * 90000)}`,
        message: 'Proposal details verified! Add MONGODB_URL in Render environment variables to store permanently.'
      });
    }

    const newProposal = await Proposal.create({
      name,
      email,
      phone,
      company: company || '',
      service: service || 'Civil Infrastructure',
      scale: scale || '$50k - $250k',
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      ticketId: `LA-${newProposal._id.toString().slice(-5).toUpperCase()}`,
      data: newProposal,
      message: 'Proposal saved successfully to MongoDB Atlas.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all proposals
// @route   GET /api/proposal
// @access  Public
const getProposals = async (req, res, next) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitProposal,
  getProposals
};
