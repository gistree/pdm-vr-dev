var express = require('express');
var app = express();
var router = express.Router();

const db_locations = require('../db/dbCon/locations');
const gj = require('../utilities/geojson');
const Layers = require('../utilities/layers');

router.get('/layers', Layers.getLayers, response);

router.get('/freguesias', db_locations.findFreguesias, response);

router.get('/localidades', db_locations.findLocalidades, gj.parseGeoJSON, response);

function response(req, res) {
    res.status(200).json(res.locals.data);
}

module.exports = router;
