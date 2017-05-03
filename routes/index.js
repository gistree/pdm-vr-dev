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

router.post('/proxy/login', function (req, res) {
    if (req.body.username == "user" && req.body.password == "12345") {
        res.status(200).json({
            username: 'jokord',
            data: {
                title: "Condicionantes",
                folder: true,
                expanded: false,
                children: [{
                    title: "Parque Natural do Alvão",
                    extraClasses: 'protected',
                    data: {
                        protected: true,
                        workspace: "cmvrpostgis",
                        name: "limite_do_parque_natural_do_alvao",
                        type: "TileWMS",
                        extent: [18766.638671875, 169217.796875, 43913.2890625, 193993.140625],
                        opacity: 1,
                        queryable: true
                    }
                }],
            }
        });
    } else {
        res.status(401).json({
            data: "Invalid"
        });
    }
});

router.get('/api/freguesias', db_locations.findFreguesias, function (req, res) {
    res.status(200).json(res.locals.data);
});

router.get('/api/localidades', db_locations.findLocalidades, gj.parseGeoJSON, function (req, res) {
    res.status(200).json(res.locals.data);
});

module.exports = router;