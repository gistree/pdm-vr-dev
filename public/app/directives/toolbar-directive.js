(function() {
    'use strict';

    angular
        .module('Toolbar')
        .directive('mapToolbar', MapToolbar);

    MapToolbar.$inject = ['mapService'];

    function MapToolbar(mapService) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: "app/templates/toolbar.html",
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    /* @ngInject */
    function ControllerController($scope, mapService) {
        $scope.scales = ['1:100000', '1:80000', '1:50000', '1:30000', '1:25000', '1:20000',
            '1:15000', '1:10000', '1:5000', '1:3500', '1:2000', '1:1000', '1:500', '1:100'
        ];
        console.log(mapService);
    }
})();