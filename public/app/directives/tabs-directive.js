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

        $scope.printSpecLocal = {
            layout: 'pdmLayout',
            srs: 'EPSG:3857',
            units: 'm',
            outputFilename: 'PDM_VilaReal',
            outputFormat: 'pdf',
            mapTitle: 'Plano Director Municipal - Vila Real',
            layers: [{
                baseURL: "http://a.tile.openstreetmap.org/",
                opacity: 1,
                singleTile: false,
                type: "OSM",
                maxExtent: [-20037508.3392, -20037508.3392, 20037508.3392, 20037508.3392],
                tileSize: [256, 256],
                extension: "png",
                resolutions: [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125,
                    2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613,
                    38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135
                ]
            }, {
                type: "WMS",
                format: "image/png",
                layers: ["pdmlocal:RESERVA_ECOLOGICA_NACIONAL"],
                baseURL: "http://localhost:8080/geoserver/wms",
                customParams: {

                }
            }],
            pages: [{
                mapTitle: "Título do Mapa",
                center: [-862594.0274085791, 5055714.580579155],
                scale: 25000,
                dpi: 300,
                requerente: 'João Cordeiro',
                nif: '123456789',
                proprietario: 'Gistree',
                freguesia: 'Folhadela',
                local: 'Folhadela'
            }],
            "legends": [{
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
            }]
        };

        $scope.printSpecRemote = {
            layout: 'pdmLayout',
            srs: 'EPSG:3857',
            units: 'm',
            outputFilename: 'PDM_VilaReal',
            outputFormat: 'pdf',
            mapTitle: 'Plano Director Municipal - Vila Real',
            layers: [{
                baseURL: "http://a.tile.openstreetmap.org/",
                opacity: 1,
                singleTile: false,
                type: "OSM",
                maxExtent: [-20037508.3392, -20037508.3392, 20037508.3392, 20037508.3392],
                tileSize: [256, 256],
                extension: "png",
                resolutions: [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125,
                    2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613,
                    38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135
                ]
            }, {
                type: "WMS",
                format: "image/png",
                layers: ["PDM-VilaReal:RESERVA_ECOLOGICA_NACIONAL"],
                baseURL: "http://gistree.espigueiro.pt/geoserver/wms",
                customParams: {

                }
            }],
            pages: [{
                mapTitle: "Título do Mapa",
                center: [-862594.0274085791, 5055714.580579155],
                scale: 25000,
                dpi: 300,
                requerente: 'João Cordeiro',
                nif: '123456789',
                proprietario: 'Gistree',
                freguesia: 'Folhadela',
                local: 'Folhadela'
            }]
        };
 
        tc.print = function () {

        }
    }
})();