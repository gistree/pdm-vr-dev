(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PagesController', PagesController)
        .controller('FormController', FormController)
        .controller('LayoutSelectionController', LayoutSelectionController)
        .controller('PrintResultController', PrintResultsController)
        .service('PrintDetailsService', PrintDetailsService);

    function PagesController() {
        var pagesCtrl = this;
        activate();
        this.activeTab = function (tab) {
            return tab == pagesCtrl.active;
        }
        this.nextPage = function (valid) {
            if (valid) {
                pagesCtrl.active++;
            }
        }

        function activate() {
            pagesCtrl.active = 1;
            pagesCtrl.ctrlName = "PagesController";
        }
    }

    FormController.$inject = ['PrintDetailsService'];

    function FormController(PrintDetailsService) {
        var formCtrl = this;
        activate();

        this.userData = {
            requerente: '',
            proprietario: '',
            nif: '',
            freguesia: '',
            local: ''
        }
        PrintDetailsService.details = this.userData;

        function activate() {
            formCtrl.ctrlName = "FormController";
        }
    }

    PrintDetailsService.$inject = ['MapService']

    function PrintDetailsService(MapService) {
        this.details = {};
        this.layers = {
            "Planta de Ordenamento": [{
                type: "WMS",
                format: "image/png",
                layers: ["PDM-VilaReal-database:RESERVA_ECOLOGICA_NACIONAL"],
                baseURL: "http://gistree.espigueiro.pt/geoserver/wms",
                customParams: {

                }
            }],
            "Planta de Condicionantes": [{
                type: "WMS",
                format: "image/png",
                layers: ["PDM-VilaReal-database:RESERVA_ECOLOGICA_NACIONAL"],
                baseURL: "http://gistree.espigueiro.pt/geoserver/wms",
                customParams: {

                }
            }]
        };
        this.printResults = [];
        this.getPrintSpec = function (mapTitle) {
            var defaultLayout = {
                layout: "pdmLayout",
                srs: "EPSG:3857",
                units: "m",
                outputFormat: "pdf",
                mapTitle: mapTitle,
                layers: [],
                pages: [{
                    center: MapService.map.getView().getCenter(),
                    scale: 10000,
                    dpi: 300,
                }]
            };
            defaultLayout.outputFilename = mapTitle.split(" ").join("_");
            defaultLayout.pages[0].MapTitle = mapTitle;
            defaultLayout.layers = this.layers[mapTitle];
            //defaultLayout.layers.push(MapService.getUserFeatures());
            angular.extend(defaultLayout.pages[0], this.details);
            console.log(MapService.userFeatures);
            //return defaultLayout;
        }
    }

    LayoutSelectionController.$inject = ['PrintDetailsService', '$http', '$q'];

    function LayoutSelectionController(PrintDetailsService, $http, $q) {
        var layoutCtrl = this;
        activate();
        layoutCtrl.change = function () {
            layoutCtrl.noSelect = !layoutCtrl.layouts.some(function (layout) {
                return layout.selected === true;
            });
        }

        layoutCtrl.printLayouts = function () {
            var printConfigs = [];
            layoutCtrl.layouts.forEach(function (layout) {
                if (layout.selected) {
                    printConfigs.push($http.post("http://gistree.espigueiro.pt:80/geoserver/pdf/create.json", PrintDetailsService.getPrintSpec(layout.name)));
                }
            });
            $q.all(printConfigs).then(function (results) {
                results.forEach(function (res) {
                    PrintDetailsService.printResults.push({
                        title: res.config.data.mapTitle,
                        url: res.data.getURL
                    });
                });
            });
        }

        function activate() {
            layoutCtrl.userData = PrintDetailsService.details;
            layoutCtrl.layouts = [{
                selected: false,
                name: "Planta de Ordenamento",
                layout: "pdmLayout",
                title: "Planta de Condicionantes",
                escala: 10000,
                tamanho: "A3"
            }, {
                selected: false,
                name: "Planta de Condicionantes",
                layout: "pdmLayout",
                title: "Planta de Condicionantes",
                escala: 10000,
                tamanho: "A3"
            }];
            layoutCtrl.noSelect = true;
        }
    }

    PrintResultsController.$inject = ['PrintDetailsService'];

    function PrintResultsController(PrintDetailsService) {
        var printResCtrl = this;
        activate();

        function activate() {
            printResCtrl.printResults = PrintDetailsService.printResults;
            printResCtrl.message1 = "A processar o seu pedido.";
            printResCtrl.message2 = "Por favor aguarde..."
        }
    }
})();