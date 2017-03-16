(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PagesController', PagesController)
        .controller('FormController', FormController);

    function PagesController() {
        var pagesCtrl = this;
        activate();
        this.active = 2;
        this.activeTab = function (tab) {
            return tab == pagesCtrl.active;
        }
        this.nextPage = function(valid){
            if(valid){
                pagesCtrl.active++;
            }
        }
        function activate() {
            pagesCtrl.ctrlName = "PagesController";
        }
    }

    function FormController() {
        var formCtrl = this;
        activate();

        this.userData = {
            requerente: '',
            proprietario: '',
            nif: null,
            freguesia: '',
            local: ''
        }

        function activate() {
            formCtrl.ctrlName = "FormController";
        }
    }
})();