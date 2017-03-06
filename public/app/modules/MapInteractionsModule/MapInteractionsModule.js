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
            controllerAs: 'InteractionsCtrl',
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
        this.active = 'DragPan';
        this.isActive = function (active) {
            return this.active == active;
        }
        $scope.currentInteraction = 'Mover Mapa';
        $scope.setDefaultView = function (a) {
            MapService.setDefaultView();
        };
        $scope.setInteraction = function (interaction) {
            MapService.map.getInteractions().pop();
            switch (interaction) {
                case 'DragPan':
                    $scope.currentInteraction = 'Mover Mapa';
                    MapService.map.addInteraction(new ol.interaction.DragPan());
                    break;
                case 'ZoomIn':
                    $scope.currentInteraction = 'Aproximar Mapa';
                    MapService.map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = MapService.map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() + 1);
                        }
                    }));
                    break;
                case 'ZoomOut':
                    $scope.currentInteraction = 'Afastar Mapa';
                    MapService.map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = MapService.map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() - 1);
                        }
                    }));
                    break;
                case 'ZoomBox':
                    $scope.currentInteraction = 'Fazer Zoom de Caixa';
                    MapService.map.addInteraction(new ol.interaction.DragZoom({
                        condition: ol.events.condition.always,
                        className: 'drag_zoom_box'
                    }));
                    break;
            }
            this.active = interaction;
        }.bind(this);
    }
})();