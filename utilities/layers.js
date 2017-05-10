'use strict';
const fs = require('fs');
const path = require('path');

var Layers = {};

Layers.getLayers = (req, res, next) => {
    var layers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/layers.json')));
    res.locals.data = layers;
    next();
};

Layers.getUserLayers = (req, res, next) => {
    res.locals.layers = [{
            "title": "Condicionantes",
            "folder": true,
            "expanded": false,
            "children": [{
                "title": "Parque Natural do Alvão",
                "data": {
                    "protected": true,
                    "workspace": "cmvrpostgis",
                    "name": "limite_do_parque_natural_do_alvao",
                    "type": "TileWMS",
                    "extent": [24565.8138696318, 183894.59376334, 32871.2498912235, 193759.879997275],
                    "opacity": 1,
                    "queryable": true
                }
            }]
        },
        {
            "title": "Ordenamento",
            "folder": true,
            "expanded": false,
            "children": [{
                "title": "Zonas Protecção Heliporto",
                "data": {
                    "protected": true,
                    "workspace": "cmvrpostgis",
                    "name": "zonas_de_protecao_ao_heliporto",
                    "type": "TileWMS",
                    "extent": [24565.8138696318, 183894.59376334, 32871.2498912235, 193759.879997275],
                    "opacity": 1,
                    "queryable": true
                }
            }]
        },
        {
            "title": "Enquadramento",
            "folder": true,
            "expanded": true,
            "children": []
        }
    ];
    next();
};

module.exports = Layers;