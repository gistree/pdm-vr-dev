var express = require('express');
var app = express();
var router = express.Router();
const db_locations = require('../db/dbCon/locations');
const gj = require('../utilities/geojson');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        version: req.app.get("version")
    });
});

router.get('/api/freguesias', db_locations.findFreguesias, function (req, res) {
    res.status(200).json(res.locals.data);
});

router.get('/api/localidades', db_locations.findLocalidades, gj.parseGeoJSON, function (req, res) {
    res.status(200).json(res.locals.data);
});

module.exports = router;