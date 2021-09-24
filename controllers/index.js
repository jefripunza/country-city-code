const { json, errorJson } = require('../utils/response');
const countrycity = require("../countrycity");

exports.index = (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    return json(res, {
        developer: 'Jefri Herdi Triyanto <jefripunza@gmail.com>',
        source: 'https://github.com/jefripunza/country-city-code',
        all: {
            endpoint_1: '/countries',
            endpoint_2: '/countries/',
            example: fullUrl + 'countries'
        },
        specific: {
            endpoint: '/countries/{country}',
            example: fullUrl + 'countries/indonesia'
        },
    });
}

exports.all = async (req, res) => {
    return json(res, countrycity);
}

exports.search = async (req, res) => {
    const { country } = req.params;
    console.log(country);
    let result = countrycity[country];
    result = result !== {} ? result : false
    if (!result) {
        return errorJson(res, "Country not found!");
    }

    return json(res, countrycity[country]);
}
