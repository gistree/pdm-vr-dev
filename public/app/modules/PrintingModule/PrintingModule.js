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

    LayoutSelectionController.$inject = ['PrintDetailsService'];

    function LayoutSelectionController(PrintDetailsService) {
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
            
            // 3. Make the request
            // 4. Print the Results
        }
    }

})();