(function () {
    'use strict';

    angular
        .module('LegendModule')
        .controller('LegendsController', LegendsController);

    LegendsController.$inject = ['$scope', 'LayersFactory'];

    function LegendsController($scope, LayersFac) {
        $scope.groups = LayersFac.source;
    }

})();