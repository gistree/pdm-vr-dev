(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PagesController', PagesController)
        .controller('FormController', FormController)
        .controller('LayoutSelectionController', LayoutSelectionController)
        .controller('PrintResultController', PrintResultsController);

    PagesController.$inject = ['$scope'];

    function PagesController($scope) {
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

        $scope.$on('resetPrinting', function () {
            pagesCtrl.active = 1;
        });

        function activate() {
            pagesCtrl.active = 1;
        }
    }
    FormController.$inject = ['$scope', 'PrintDetailsService'];

    function FormController($scope, PrintDetailsService) {
        var formCtrl = this;
        activate();

        $scope.$on('resetPrinting', function () {
            activate();
        });

        function activate() {
            formCtrl.userData = {
                requerente: '',
                proprietario: '',
                nif: '',
                freguesia: '',
                local: ''
            }
            PrintDetailsService.setDetails(formCtrl.userData);
        }
    }

    LayoutSelectionController.$inject = ['$scope', 'PrintDetailsService', '$http', '$q'];

    function LayoutSelectionController($scope, PrintDetailsService, $http, $q) {
        var layoutCtrl = this;
        activate();
        this.change = function () {
            layoutCtrl.noSelect = !layoutCtrl.layouts.some(function (layout) {
                return layout.selected === true;
            });
        }
        this.printLayouts = function () {
            var printConfigs = [];
            layoutCtrl.layouts.forEach(function (layout) {
                if (layout.selected) {
                    printConfigs.push($http.post("http://gistree.espigueiro.pt:80/geoserver/pdf/create.json", PrintDetailsService.getPrintSpec(layout.name, layout.type)));
                }
            });
            $q.all(printConfigs).then(function (results) {
                results.forEach(function (res) {
                    PrintDetailsService.addNewResult({
                        title: res.config.data.mapTitle,
                        url: res.data.getURL
                    });
                });
            });
        }

        $scope.$on('resetPrinting', function () {
            activate();
        });

        function activate() {
            layoutCtrl.layouts = [{
                selected: false,
                name: "Planta de Ordenamento",
                layout: "pdmLayout",
                title: "Planta de Ordenamento",
                escala: 10000,
                type: 'ordenamento',
                tamanho: "A3"
            }, {
                selected: false,
                name: "Planta de Condicionantes",
                layout: "pdmLayout",
                title: "Planta de Condicionantes",
                type: 'condicionantes',
                escala: 10000,
                tamanho: "A3"
            }];
            layoutCtrl.noSelect = true;
        }
    }

    PrintResultsController.$inject = ['$scope', 'PrintDetailsService'];

    function PrintResultsController($scope, PrintDetailsService) {
        var printResCtrl = this;
        activate();

        this.newPrint = function () {
            $scope.$parent.$broadcast('resetPrinting');
            PrintDetailsService.resetPrintResults();
        }

        function activate() {
            printResCtrl.printResults = PrintDetailsService.getPrintResults();
            printResCtrl.message1 = "A processar o seu pedido.";
            printResCtrl.message2 = "Por favor aguarde..."
        }
    }
})();