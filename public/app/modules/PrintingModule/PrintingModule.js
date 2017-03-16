(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PagesController', PagesController);

    function PagesController() {
        var vm = this;
        activate();

        function activate() {}
    }
})();