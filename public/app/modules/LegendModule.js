(function () {
    'use strict';

    angular.module('LegendModule', []);

})();

(function () {
    'use strict';

    angular
        .module('LegendModule')
        .controller('LegendsController', LegendsController);

    LegendsController.$inject = ['$scope', 'LayersFactory'];

    function LegendsController($scope, LayersFac) {
        $scope.layers = createLegends(LayersFac.source);
    }

    function createLegends(layersSource){
        var retData = [];
        layersSource.forEach(function(layer){
            if(layer.folder){
                layer.children.forEach(function(layer){
                    retData.push(layer);
                });
            }else{
                retData.push(layer);
            }
        });
        return retData;
    }

})();