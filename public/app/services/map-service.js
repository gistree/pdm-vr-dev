(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .factory('mapService', mapService)

    function mapService() {
        var _layers = {};
        if (!ol) return {};
        var map = {},
            defaults = {
                zoom: 11,
                target: 'map',
                center: [-7.699871063232422, 41.21637029336946],
            };
        var ms = {
            map: map, // ol.Map
            init: init,
            setLayer: setLayer,
            removeLayer: removeLayer,
            setOtherLayer: setOtherLayer
        };
        return ms;

        function init(config) {
            var config = angular.extend(defaults, config);
            map = new ol.Map({
                target: config.target,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.transform(config.center, 'EPSG:4326', 'EPSG:3857'),
                    zoom: config.zoom
                })
            });
            console.log("MAP CONFIG FINISH");
            window.map = map;
        };

        function setOtherLayer(layerData) {
            console.log("SetOtherLayer");
            //http://gistree.espigueiro.pt/geoserver/wfs?service=WFS&version=1.1.1&request=GetFeature&typeName=PDM-VilaReal:AER%C3%93DROMO&outputFormat=application/json
            var layerWFS = new ol.layer.Vector({
                source: new ol.source.Vector({
                    loader: function (extent) {
                        $.ajax('http://gistree.espigueiro.pt/geoserver/wfs', {
                            type: 'GET',
                            data: {
                                service: 'WFS',
                                version: '1.1.1',
                                request: 'GetFeature',
                                typename: 'PDM-VilaReal:AERÓDROMO',
                                //srsname: 'EPSG:3857',
                                outputFormat: 'application/json',
                                //bbox: extent.join(',') + ',EPSG:3857'
                            }
                        }).done(function (response) {
                            console.log(response);
                            console.log("IN RESPONSE");
                            /*layerWFS
                                .getSource()
                                .addFeatures(new ol.format.GeoJSON()
                                    .readFeatures(response));*/
                        });
                    },
                    strategy: ol.loadingstrategy.all,
                    //projection: 'EPSG:3857'
                })
            });
            map.addLayer(layerWFS);
        }

        function setLayer(layerData) {
            if (!_layers[layerData.key]) {
                var simpleWMS = new ol.layer.Image({
                    opacity: layerData.opacity,
                    source: new ol.source.ImageWMS({
                        url: 'http://gistree.espigueiro.pt/geoserver/wms',
                        params: {
                            'LAYERS': layerData.workspace + ":" + layerData.name
                        },
                        extent: layerData.extent
                    })
                });
                _layers[layerData.key] = simpleWMS;
                map.addLayer(simpleWMS);
                _layers[layerData.key].visible = true;
            } else {
                if (!_layers[layerData.key].visible) {
                    map.addLayer(_layers[layerData.key]);
                    _layers[layerData.key].visible = true;
                }
            }
        }

        function removeLayer(layerData) {
            if (_layers[layerData.key]) {
                map.removeLayer(_layers[layerData.key]);
                _layers[layerData.key].visible = false;
            }
        }
    };
})();