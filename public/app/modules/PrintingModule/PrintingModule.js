(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PagesController', PagesController)
        .controller('FormController', FormController)
        .controller('LayoutSelectionController', LayoutSelectionController)
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
            pagesCtrl.active = 3;
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

    function PrintDetailsService() {
        this.details = {};
    }

    LayoutSelectionController.$inject = ['PrintDetailsService', '$http'];

    function LayoutSelectionController(PrintDetailsService, $http) {
        var layoutCtrl = this;
        activate();

        layoutCtrl.change = function () {
            layoutCtrl.noSelect = !layoutCtrl.layouts.some(function (layout) {
                return layout.selected === true;
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
        layoutCtrl.printLayouts = function () {
            //TODO
            // 2. Get the data for request
            // First We Test
            var printSpec = {
                layout: "pdmLayout",
                srs: "EPSG:3857",
                units: "m",
                outputFilename: "PDM_VilaReal",
                outputFormat: "pdf",
                mapTitle: "Plano Director Municipal - Vila Real",
                layers: [{
                    type: "WMS",
                    format: "image/png",
                    layers: ["PDM-VilaReal-database:RESERVA_ECOLOGICA_NACIONAL"],
                    baseURL: "http://gistree.espigueiro.pt/geoserver/wms",
                    customParams: {

                    }
                }],
                pages: [{
                    MapTitle: "Título do Mapa",
                    center: [-862594.0274085791, 5055714.580579155],
                    scale: 10000,
                    dpi: 300,
                }]
            };
            angular.extend(printSpec.pages[0], PrintDetailsService.details)
            console.log(printSpec);
            // 3. Make the request
            $http.post("http://gistree.espigueiro.pt:80/geoserver/pdf/create.json", printSpec).then(function successCallback(response) {
                console.log(response);
            });
            // 4. Print the Results
        }
    }
})();