(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .directive('gesTabs', Directive);

    Directive.$inject = ['LayersFactory', 'MapService', 'LegendsService'];

    function Directive(LayersFactory, MapService, LegendsService) {
        var directive = {
            bindToController: true,
            controller: tabsController,
            controllerAs: 'tc',
            link: link,
            restrict: 'E',
            scope: {
                menuIsHidden: "="
            },
            templateUrl: 'app/templates/tabs.html'
        };
        return directive;

        function link(scope, element, attrs) {
            var tree = element.find("#tree").fancytree({
                extensions: ["edit", "glyph", "wide"],
                checkbox: true,
                glyph: LayersFactory.glyph_opts,
                clickFolderMode: 3,
                selectMode: 3,
                source: LayersFactory.source,
                toggleEffect: {
                    effect: "drop",
                    options: {
                        direction: "left"
                    },
                    duration: 400
                },
                wide: {
                    iconWidth: "1em",
                    iconSpacing: "0.5em",
                    levelOfs: "1.5em"
                },
                select: function (event, data) {
                    if (data.node.isFolder()) {
                        var children = data.node.children;
                        if (data.node.isSelected()) {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                MapService.addLayer(el.data);
                                LegendsService.addLayerLegend(el);
                            });
                        } else {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                MapService.removeLayer(el.data);
                                LegendsService.removeLayerLegend(el);
                            });
                        }
                    } else {
                        if (data.node.isSelected()) {
                            data.node.data.key = data.node.key;
                            MapService.addLayer(data.node.data);
                            LegendsService.addLayerLegend(data.node);
                        } else {
                            data.node.data.key = data.node.key;
                            MapService.removeLayer(data.node.data);
                            LegendsService.removeLayerLegend(data.node);
                        }
                    }
                    scope.$apply();
                }
            });
            scope.tree = element.find("#tree").fancytree("getTree");
        }
    }

    /* @ngInject */
    function tabsController($scope) {
        var tc = this;
        $scope.groups = [];
        tc.expandTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(true);
            });
        };
        tc.collapseTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(false);
            });
        };
        tc.deselectAll = function () {
            $scope.tree.visit(function (node) {
                node.setSelected(false);
            });
        };
        tc.hideMenu = function () {
            $scope.$parent.menuIsHidden = true;
        }
        tc.help = function () {
            alert(" Em Desenvolvimento... ");
        }

        var albergaria = {
            "outputFilename": "Planta_SIG148940153.8432",
            "layout": "A4_carta_3",
            "dpi": 150,
            "titulo": "Património",
            "subtitulo": "Extrato da planta de Património",
            "requerente": "aaa",
            "nif": "123456798",
            "proprietario": "asd",
            "freguesia": "asdas",
            "local": "asdasd",
            "fonte": "Câmara Municipal de Albergaria-A-Velha, 2015",
            "srs": "EPSG:3763",
            "units": "m",
            "layers": [{
                type: "WMS",
                format: "image/png",
                layers: ["sig:carta_3"],
                baseURL: "http://sig.cm-albergaria.pt/geoserver/wms",
                styles: [""],
                customParams: {
                    BUFFER: 0,
                    TRANSPARENT: true
                }
            }, {
                type: "Vector",
                styles: {
                    "": {
                        fill: false,
                        fillColor: "#FF0000",
                        strokeWidth: 2,
                        strokeColor: "#FF0000",
                        fillOpacity: 0.0
                    }
                },
                geoJson: {
                    "type": "FeatureCollection",
                    "features": []
                }
            }],
            "pages": [{
                "center": [-32694.71949999965, 114004.60895000049],
                "scale": 10000,
                "rotation": 0,
            }],
            "legends": [{
                "name": "",
                "classes": [{
                    "name": "",
                    "iconAfterName": true,
                    "icon": "http://sig.cm-albergaria.pt/geoserver/wms?version=1.3.0&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&EXCEPTIONS=application/vnd.ogc.se_xml&LAYER=sig:planta_localizacao&FORMAT=image/png&SCALE=0.5&LEGEND_OPTIONS=forceLabels:on;fontName:Helvetica;fontSize:10;layout:vertical;columns:20"
                }]
            }, ],
        }

        /*$scope.spec = {
            "outputFilename": "TestePrint",
            "layout": "A4 portrait",
            "dpi": 150,
            "titulo": "Património",
            "subtitulo": "Extrato da planta de Património",
            "requerente": "1231",
            "nif": "123456789",
            "proprietario": "asdasd",
            "freguesia": "assdasda",
            "local": "asdasdasd",
            "fonte": "Câmara Municipal de Albergaria-A-Velha,2015",
            "srs": "EPSG:3763",
            "units": "m",
            "layers": [{
                type: "WMS",
                format: "image/png",
                layers: ["PDM-VilaReal:RESERVA_AGRICOLA_NACIONAL"],
                baseURL: "http://gistree.espigueiro.pt/geoserver/wms",
                styles: [""],
                customParams: {
                    BUFFER: 0,
                    TRANSPARENT: true
                }
            }, {
                type: "Vector",
                styles: {
                    "": {
                        fill: false,
                        fillColor: '#FF0000',
                        strokeWidth: 2,
                        strokeColor: '#FF0000',
                        fillOpacity: 0.0
                    }
                },
                geoJson: {
                    "type": "FeatureCollection",
                    "features": []
                }
            }],
            "pages": [{
                "center": [-32694.71949999965, 114004.60895000049],
                "scale": 10000,
                "rotation": 0,
            }],
            "legends": [{
                "name": "",
                "classes": [{
                    "name": "",
                    "iconAfterName": true,
                    "icon": "http://gistree.espigueiro.pt/geoserver/wms?version=1.3.0&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&EXCEPTIONS=application/vnd.ogc.se_xml&LAYER=PDM-VilaReal:RESERVA_AGRICOLA_NACIONAL&FORMAT=image/png&SCALE=0.5&LEGEND_OPTIONS=forceLabels:on;fontName:Helvetica;fontSize:10;layout:vertical;columns:20"
                }]
            }, ],
        }*/

        $scope.printSpecLocal = {
            layout: 'MyLayout',
            title: "Servidor da Gistree - Testes de Impressão",
            subtitle: "Primeiros Testes de Impressão",
            srs: 'EPSG:27493',
            units: 'm',
            outputFilename: 'teste',
            outputFormat: 'pdf',
            mapTitle: 'Título do Mapa',
            layers: [{
                type: "WMS",
                format: "image/png",
                layers: ["pdmlocal:RESERVA_ECOLOGICA_NACIONAL"],
                baseURL: "http://localhost:8080/geoserver/wms",
                customParams: {

                }
            }],
            pages: [{
                comment: "This is a Comment",
                mapTitle: "Testing Map",
                center: [26190.7170, 184143.6155],
                scale: 25000,
                dpi: 300,
                requerente: 'João Cordeiro',
                nif: '123456789',
                proprietario: 'Gistree',
                freguesia: 'Folhadela',
                local: 'Folhadela'
            }],
            /*"legends": [{
                "name": "Reservas",
                "classes": [{
                        "name": "",
                        "iconAfterName": false,
                        "icons": "http://localhost:8080/geoserver/wms?version=1.3.0%26SERVICE=WMS%26REQUEST=GetLegendGraphic%26WIDTH=20%26HEIGHT=20%26LAYER=pdmlocal:RESERVA_AGRICOLA_NACIONAL%26FORMAT=image/png%26LEGEND_OPTIONS=forceLabels:on;"
                    },
                    {
                        "name": "",
                        "iconAfterName": false,
                        "icon": "http://localhost:8080/geoserver/wms?version=1.3.0%26SERVICE=WMS%26REQUEST=GetLegendGraphic%26WIDTH=20%26HEIGHT=20%26LAYER=pdmlocal:RESERVA_AGRICOLA_NACIONAL%26FORMAT=image/png%26LEGEND_OPTIONS=forceLabels:on;"
                    },
                ]
            }, {
                "name": "Reservas 2",
                "classes": [{
                        "name": "",
                        "iconAfterName": false,
                        "icon": "http://localhost:8080/geoserver/wms?version=1.3.0%26SERVICE=WMS%26REQUEST=GetLegendGraphic%26WIDTH=20%26HEIGHT=20%26LAYER=pdmlocal:RESERVA_AGRICOLA_NACIONAL%26FORMAT=image/png%26LEGEND_OPTIONS=forceLabels:on;"
                    },
                    {
                        "name": "",
                        "iconAfterName": false,
                        "icon": "http://localhost:8080/geoserver/wms?version=1.3.0%26SERVICE=WMS%26REQUEST=GetLegendGraphic%26WIDTH=20%26HEIGHT=20%26LAYER=pdmlocal:RESERVA_AGRICOLA_NACIONAL%26FORMAT=image/png%26LEGEND_OPTIONS=forceLabels:on;"
                    },
                ]
            }]*/
        };

        $scope.printSpecRemote = {
            layout: 'MyLayout',
            title: "Servidor da Gistree - Testes de Impressão",
            subtitle: "Primeiros Testes de Impressão",
            srs: 'EPSG:27493',
            units: 'm',
            outputFilename: 'teste',
            outputFormat: 'pdf',
            mapTitle: 'Título do Mapa',
            layers: [{
                type: "WMS",
                format: "image/png",
                layers: ["pdmteste:reserva"],
                baseURL: "http://172.16.0.2/geoserver/wms",
                customParams: {

                }
            }],
            pages: [{
                comment: "This is a Comment",
                mapTitle: "Testing Map",
                center: [26190.7170, 184143.6155],
                scale: 25000,
                dpi: 300,
                requerente: 'João Cordeiro',
                nif: '123456789',
                proprietario: 'Gistree',
                freguesia: 'Folhadela',
                local: 'Folhadela'
            }]
        }


        tc.print = function () {

        }
    }
})();