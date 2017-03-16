(function () {
    'use strict';

    angular
        .module('DrawingModule')
        .controller('DrawingController', DrawingController);

    DrawingController.$inject = ['$scope','MapService']

    function DrawingController($scope, MapService) {
        var drawCtrl = this;
        var _style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.3)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(174,0,0,0.75)',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(174,0,0,0.75)'
                })
            })
        });
        var _revStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.3)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(174,0,0,0.75)',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'rgba(174,0,0,0.75)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 255, 255, 0.3)'
                })
            })
        });
        var _source = new ol.source.Vector({
            wrapX: false
        });
        var _vector = new ol.layer.Vector({
            source: _source,
            style: _style
        });
        var _draw;
        var _map = MapService.map;
        var _defaultInfo = "Utilize os botões para definir o tipo de desenho desejado."
        drawCtrl.ControllerName = "DrawingCtrl";
        drawCtrl.info = _defaultInfo;

        drawCtrl.setDrawingMode = function (dM) {
            _setInformationText(dM);
            _map.removeInteraction(_draw);
            _map.removeLayer(_vector);
            _draw = new ol.interaction.Draw({
                source: _source,
                style: _revStyle,
                type: dM
            });
            _map.addInteraction(_draw);
            _draw.once('drawend', function (evt) {
                MapService.map.removeInteraction(_draw);
                drawCtrl.info = _defaultInfo;
                $scope.$apply();
            });
            _map.addLayer(_vector);
        }

        drawCtrl.clearDraw = function () {
            _map.removeLayer(_vector);
            _vector.getSource().clear();
        }

        function _setInformationText(dM) {
            switch (dM) {
                case 'Point':
                    drawCtrl.info = "Para desenhar um ponto, faça clique no mapa.";
                    break;
                case 'LineString':
                    drawCtrl.info = "Para desenhar uma linha, vá clicando no mapa. Duplo clique termina a linha.";
                    break;
                case 'Polygon':
                    drawCtrl.info = "Para desenhar um polígono, vá clicando no mapa. Duplo clique fecha o polígono";
                    break;
                case 'Circle':
                    drawCtrl.info = "Para desenhar um círculo, faça clique no mapa e arraste.";
                    break;
            }
        }
    }
})();