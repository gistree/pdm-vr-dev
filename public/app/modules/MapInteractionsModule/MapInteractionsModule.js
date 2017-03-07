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
            controllerAs: 'itCtrl',
            link: link,
            restrict: 'E',
            scope: {
                menuIsHidden: "="
            },
            templateUrl: 'app/modules/MapInteractionsModule/template.html'
        };
        return directive;

        function link(scope, element, attrs) {}
    }

    InteractionsController.$inject = ['$scope', '$timeout', 'MapService'];

    function InteractionsController($scope, $timeout, MapService) {
        this.active = 'DragPan';
        this.isActive = function (active) {
            return this.active == active;
        }
        this.currentInteraction = 'Mover Mapa';
        this.setDefaultView = function (a) {
            MapService.setDefaultView();
        };
        this.setInteraction = function (interaction) {
            MapService.map.getInteractions().pop();
            switch (interaction) {
                case 'DragPan':
                    this.currentInteraction = 'Mover Mapa';
                    MapService.map.addInteraction(new ol.interaction.DragPan());
                    break;
                case 'ZoomIn':
                    this.currentInteraction = 'Aproximar Mapa';
                    MapService.map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = MapService.map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() + 1);
                        }
                    }));
                    break;
                case 'ZoomOut':
                    this.currentInteraction = 'Afastar Mapa';
                    MapService.map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = MapService.map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() - 1);
                        }
                    }));
                    break;
                case 'ZoomBox':
                    this.currentInteraction = 'Fazer Zoom de Caixa';
                    MapService.map.addInteraction(new ol.interaction.DragZoom({
                        condition: ol.events.condition.always,
                        className: 'drag_zoom_box'
                    }));
                    break;
            }
            this.active = interaction;
        };
        this.showMenu = function () {
            this.menuIsHidden = false;
        }
        $scope.$watch('itCtrl.menuIsHidden', function () {
            $timeout(function () {
                MapService.map.updateSize();
            }, 10);
        });
    }
})();