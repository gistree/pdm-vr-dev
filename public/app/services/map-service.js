(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .factory('MapService', MapService)

    function MapService() {
        var _layers = {};
        if (!ol) return {};
        var map = {},
            defaultMapConfig = {
                zoom: 11,
                target: 'map',
                center: [-7.699871063232422, 41.21637029336946],
                interactions: [new ol.interaction.MouseWheelZoom(), new ol.interaction.DragPan()],
                controls: [new ol.control.ScaleLine()]
            },
            mapConfig = {};
        if (angular.equals(map, {})) {
            init();
        }
        var ms = {
            map: map, // ol.Map
            init: init,
            addLayer: addLayer,
            removeLayer: removeLayer,
            setDefaultView: setDefaultView
        };
        return ms;

        function init(config) {
            proj4.defs("EPSG:27493", "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");
            var extent = [-127101.82, -300782.39, 160592.41, 278542.12];
            var projection = ol.proj.get('EPSG:27493');
            projection.setExtent(extent);
            mapConfig = angular.extend(defaultMapConfig, config);
            map = new ol.Map({
                target: mapConfig.target,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                interactions: mapConfig.interactions,
                controls: mapConfig.controls,
                view: new ol.View({
                    center: ol.proj.transform(mapConfig.center, 'EPSG:4326', 'EPSG:3857'),
                    zoom: mapConfig.zoom
                })
            });          
        };

        function addLayer(layerData) {
            if (layerData.type === 'Raster') {
                addWMSLayer(layerData);
            } else {
                addWFSLayer(layerData);
            }
        }

        function addWFSLayer(layerData) {
            if (_checkLayer(layerData.key)) {
                var wfsLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        loader: function (extent) {
                            $.ajax('http://gistree.espigueiro.pt/geoserver/wfs', {
                                type: 'GET',
                                data: {
                                    service: 'WFS',
                                    version: '1.1.1',
                                    request: 'GetFeature',
                                    typename: layerData.workspace + ":" + layerData.name,
                                    srsname: 'EPSG:27493',
                                    outputFormat: 'application/json',
                                    bbox: ol.proj.transformExtent(extent, 'EPSG:3857', ol.proj.get('EPSG:27493')).join(',') + ',' + ol.proj.get('EPSG:27493').getCode()
                                },
                                crossDomain: true,
                            }).done(function (response) {
                                wfsLayer
                                    .getSource()
                                    .addFeatures(
                                        new ol.format.GeoJSON().readFeatures(response, {
                                            featureProjection: 'EPSG:3857',
                                            dataProjection: ol.proj.get('EPSG:27493')
                                        }));
                            });
                        },
                        strategy: ol.loadingstrategy.bbox,
                    })
                });
                _layers[layerData.key] = wfsLayer;
                if (layerData.style) {
                    wfsLayer.setStyle(new ol.style.Style(layerData.style));
                    wfsLayer.setOpacity(layerData.opacity);
                }
                map.addLayer(wfsLayer);
                _layers[layerData.key].visible = true;
            } else {
                if (!_layers[layerData.key].visible) {
                    map.addLayer(_layers[layerData.key]);
                    _layers[layerData.key].visible = true;
                }
            }
        }

        function addWMSLayer(layerData) {
            if (_checkLayer(layerData.key)) {
                var wmsLayer = new ol.layer.Image({
                    opacity: layerData.opacity,
                    source: new ol.source.ImageWMS({
                        url: 'http://gistree.espigueiro.pt/geoserver/wms',
                        params: {
                            'LAYERS': layerData.workspace + ":" + layerData.name
                        },
                        extent: layerData.extent
                    })
                });
                _layers[layerData.key] = wmsLayer;
                map.addLayer(wmsLayer);
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

        function setDefaultView() {
            map.setView(new ol.View({
                center: ol.proj.transform(mapConfig.center, 'EPSG:4326', 'EPSG:3857'),
                zoom: mapConfig.zoom
            }));
        }

        function _checkLayer(layer_key) {
            return !_layers.hasOwnProperty(layer_key);
        }
    };
})();