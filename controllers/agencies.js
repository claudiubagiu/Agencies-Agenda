const Agentie = require('../models/agentie');
const Tip = require('../models/tip');
const Spatiu = require('../models/spatiu');
const Oferta = require('../models/oferta');
const ViewOferte = require('../models/viewoferte');

exports.getIndexPage = (req, res, next) => {
    Promise.all([
        Agentie.findAll(),
        Tip.findAll(),
        Spatiu.findAll(),
        Oferta.findAll(),
        Agentie.getAgentieById(4)
    ])
        .then(([agencies, types, spaces, offers, ag3]) => {
            res.render('agency/index', {
                agencies: agencies,
                types: types,
                spaces: spaces,
                offers: offers,
                ag3: ag3,
                pageTitle: 'Agentii'
            });
        })
        .catch(err => console.log(err));
};

exports.getInfoAgencies = (req, res, next) => {
    Agentie.findAll()
        .then(agencies => {
            res.render('agency/info-agencies', {
                pageTitle: 'Info Agencies',
                agencies: agencies
            });
        })
        .catch(err => console.log(err));
};

exports.getInfoSpaces = (req, res, next) => {
    Spatiu.findAll()
        .then(spaces => {
            res.render('agency/info-spaces', {
                pageTitle: 'Info Spaces',
                spaces: spaces
            });
        })
        .catch(err => console.log(err));
};

exports.getInfoOffers = (req, res, next) => {
    Oferta.findAll()
        .then(offers => {
            res.render('agency/info-offers', {
                pageTitle: 'Info Offers',
                offers: offers
            });
        })
        .catch(err => console.log(err));
};

exports.getInfoTypes = (req, res, next) => {
    Tip.findAll()
        .then(types => {
            res.render('agency/info-types', {
                pageTitle: 'Info Types',
                types: types
            });
        })
        .catch(err => console.log(err));
};

exports.getAgencies = (req, res, next) => {
    Agentie.findAll()
        .then(agencies => {
            res.render('agency/agencies', {
                pageTitle: "Agencies",
                agencies: agencies
            });
        })
        .catch(err => console.log(err));
};

exports.getAgency = (req, res, next) => {
    const agencyId = req.params.agencyId;
    ViewOferte.findAll({ where: { id_agentie: agencyId } })
        .then(offers => {
            res.render('agency/agency', {
                pageTitle: 'Agency Details',
                offers: offers,
                offer: offers[0]
            });
        })
        .catch(err => console.log(err));
};