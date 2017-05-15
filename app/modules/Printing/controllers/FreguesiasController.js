(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('FreguesiasController', FreguesiasController);

    FreguesiasController.$inject = ['LocationsFactory']

    function FreguesiasController(LocationsFactory) {
        var frCtrl = this;
        activate();

        frCtrl.setFreguesia = function (freguesia) {
            frCtrl.selected = true;
            frCtrl.$parent.freguesia = freguesia.name;
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