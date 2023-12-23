const express = require('express');

const agenciesController = require('../controllers/agencies');

const router = express.Router();

router.get('/', agenciesController.getIndexPage);

router.get('/info-agencies', agenciesController.getInfoAgencies);

router.get('/info-offers', agenciesController.getInfoOffers);

router.get('/info-spaces', agenciesController.getInfoSpaces);

router.get('/info-types', agenciesController.getInfoTypes);

router.get('/agencies', agenciesController.getAgencies);

router.get('/agency/:agencyId', agenciesController.getAgency);

router.get('/search', agenciesController.getSearch);

router.get('/query1', agenciesController.getQuery1);

router.get('/query2', agenciesController.getQuery2);

router.get('/query3', agenciesController.getQuery3);

router.get('/query4', agenciesController.getQuery4);

router.get('/query5', agenciesController.getQuery5);

router.get('/query6', agenciesController.getQuery6);

router.get('/query7', agenciesController.getQuery7);

router.get('/query8', agenciesController.getQuery8);

router.get('/query9', agenciesController.getQuery9);

router.post('/query9', agenciesController.postQuery9);

module.exports = router;