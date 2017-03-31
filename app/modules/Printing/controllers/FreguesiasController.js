(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('FreguesiasController', FreguesiasController);

    function FreguesiasController() {
        var frCtrl = this;
        activate();

        frCtrl.setFreguesia = function (freguesia) {
            frCtrl.selected = true;
            frCtrl.freguesia = freguesia.name;
        }

        frCtrl.isSelected = function(){
            return frCtrl.selected;
        }

        function activate() {
            frCtrl.selected = false;
            frCtrl.freguesias = [{
                    name: "Constantim e Vale de Nogueiras",
                },
                {
                    name: "Adoufe e Vilarinho da Samardã",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "UF de Constantim e Vale de Nogueiras",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                },{
                    name: "Folhadela",
                },
                {
                    name: "Constantim",
                }
            ];
            frCtrl.freguesia = "Freguesia";
        }
    }
})();