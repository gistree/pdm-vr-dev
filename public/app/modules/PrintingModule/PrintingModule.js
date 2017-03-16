(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PagesController', PagesController);

    function PagesController() {
        var pagesCtrl = this;
        activate();
        this.active = 2;
        this.activeTab = function(tab){
            return tab == pagesCtrl.active;
        }
        function activate() {
            pagesCtrl.ctrlName = "PagesController";
        }
    }
})();