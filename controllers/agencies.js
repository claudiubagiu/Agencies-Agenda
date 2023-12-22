const Agentie = require('../models/agentie');
const Tip = require('../models/tip');
const Spatiu = require('../models/spatiu');
const Oferta = require('../models/oferta');

exports.getAgencies = (req, res, next) => {
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