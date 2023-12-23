const Agentie = require('../models/agentie');
const Tip = require('../models/tip');
const Spatiu = require('../models/spatiu');
const Oferta = require('../models/oferta');
const ViewOferte = require('../models/viewoferte');
const Exceptii = require('../models/exceptii');

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

exports.getSearch = (req, res, next) => {
    res.render('agency/search', {
        pageTitle: "Search"
    });
};

exports.getQuery1 = (req, res, next) => {
    Spatiu.ex3a()
        .then(spaces => {
            res.render('agency/queries/query1', {
                pageTitle: "Query",
                spaces: spaces
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery2 = (req, res, next) => {
    Oferta.ex3b()
        .then(offers => {
            res.render('agency/queries/query2', {
                pageTitle: 'Query',
                offers: offers
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery3 = (req, res, next) => {
    Oferta.ex4a()
        .then(offers => {
            res.render('agency/queries/query3', {
                pageTitle: 'Query',
                offers: offers
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery4 = (req, res, next) => {
    Oferta.ex4b()
        .then(offers => {
            res.render('agency/queries/query4', {
                pageTitle: 'Query',
                offers: offers
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery5 = (req, res, next) => {
    Spatiu.ex5a()
        .then(spaces => {
            res.render('agency/queries/query5', {
                pageTitle: 'Query',
                spaces: spaces
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery6 = (req, res, next) => {
    Agentie.ex5b()
        .then(agencies => {
            res.render('agency/queries/query6', {
                pageTitle: 'Query',
                agencies: agencies
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery7 = (req, res, next) => {
    Oferta.ex6a()
        .then(offers => {
            res.render('agency/queries/query7', {
                pageTitle: 'Query',
                offers: offers
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery8 = (req, res, next) => {
    Oferta.ex6b()
        .then(offers => {
            res.render('agency/queries/query8', {
                pageTitle: 'Query',
                offers: offers
            });
        })
        .catch(err => console.log(err));
};

exports.getQuery9 = (req, res, next) => {
    Exceptii.findAll()
        .then(exceptions => {
            res.render('agency/queries/query9', {
                pageTitle: 'Query',
                exceptions: exceptions
            });
        })
        .catch(err => console.log(err));
};

exports.postQuery9 = (req, res, next) => {
    Exceptii.ex8()
        .then(result => {
            return Exceptii.findAll()
        })
        .then(exceptions => {
            res.render('agency/queries/query9', {
                pageTitle: 'Query',
                exceptions: exceptions
            });
        })
        .catch(err => console.log(err));
}
