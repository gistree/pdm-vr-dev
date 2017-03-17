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
            nif: null,
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
                escala: 10000,
                tamanho: "A3"
            }, {
                selected: false,
                name: "Planta de Condicionantes",
                layout: "pdmLayout",
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
                    mapTitle: "Título do Mapa",
                    center: [-862594.0274085791, 5055714.580579155],
                    scale: 10000,
                    dpi: 300,
                    requerente: "João Cordeiro",
                    nif: "123456789",
                    proprietario: "Gistree",
                    freguesia: "Folhadela",
                    local: "Folhadela"
                }]
            };

            // 3. Make the request
            // GET REQUEST WORKS
            /*$http({
                method: 'GET',
                url: 'http://gistree.espigueiro.pt/geoserver/pdf/print.pdf',
                params: {
                    "spec": printSpec
                }
            }).then(function successCallback(response) {
                console.log("Response");
                console.log(response);
            }, function errorCallback(response) {
                console.log("Error");
                console.log(response);
            });*/
            // POST REQUEST
            $http.post("http://gistree.espigueiro.pt/geoserver/pdf/create.json",
                printSpec, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(function successCallback(response) {
                console.log("Response");
                console.log(response);
            }, function errorCallback(response) {
                console.log("Error");
                console.log(response);
            });
            // 4. Print the Results
        }
    }

})();