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

        function activate() {
            layoutCtrl.userData = PrintDetailsService.details;
            layoutCtrl.selectedLayouts = {
                ordenamento: false,
                condicionantes: false
            };
        }

        layoutCtrl.printLayouts = function () {
            
        }
    }

})();