(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('FreguesiasController', FreguesiasController);

    FreguesiasController.$inject = ['LocationsFactory', '$scope']

    function FreguesiasController(LocationsFactory, $scope) {
        var frCtrl = this;
        activate();

        frCtrl.setFreguesia = function (freguesia) {
            frCtrl.selected = true;
            frCtrl.freguesia = freguesia.name;
            console.log($scope.$parent); 
        }

        frCtrl.isSelected = function () {
            return frCtrl.selected;
        }

        function activate() {
            frCtrl.selected = false;
            LocationsFactory.getFreguesias(function (res) {
                frCtrl.freguesias = res;
            });
            frCtrl.freguesia = "Freguesia";
        }
    }
})();