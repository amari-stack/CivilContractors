const express = require('express');
const router = express.Router();
const { submitProposal, getProposals } = require('../controllers/proposalController');

router.post('/', submitProposal);
router.get('/', getProposals);

module.exports = router;
