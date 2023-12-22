const express = require('express');

const agenciesController = require('../controllers/agencies');

const router = express.Router();

router.get('/', agenciesController.getIndexPage);

router.get('/info-agencies', agenciesController.getInfoAgencies);

router.get('/info-offers', agenciesController.getInfoOffers);

router.get('/info-spaces', agenciesController.getInfoSpaces);

router.get('/info-types', agenciesController.getInfoTypes);

router.get('/agencies', agenciesController.getAgencies);

module.exports = router;