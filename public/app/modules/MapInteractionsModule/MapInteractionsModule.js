(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .directive('mapInteractions', MapInteractions)
        .controller('InteractionsController', InteractionsController);

    function MapInteractions() {

        var directive = {
            bindToController: true,
            controller: InteractionsController,
            controllerAs: 'tc',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: 'app/modules/MapInteractionsModule/template.html'
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    InteractionsController.$inject = ['$scope', 'MapService'];

    function InteractionsController($scope, MapService) {
        var vm = this;
        activate();

        $scope.scaleArray = ['1:100000', '1:80000', '1:50000', '1:30000', '1:25000', '1:20000', '1:15000', '1:10000', '1:5000', '1:3500', '1:2000', '1:1000', '1:500', '1:100']

        function activate() {}
    }
})();