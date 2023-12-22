const express = require('express');

const agenciesController = require('../controllers/agencies');

const router = express.Router();

router.get('/', agenciesController.getAgencies);

module.exports = router;