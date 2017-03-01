(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .directive('gesTabs', Directive);

    Directive.$inject = ['treeData', 'mapService'];

    function Directive(treeData, mapService) {
        mapService.init();
        var directive = {
            bindToController: true,
            controller: tabsController,
            controllerAs: 'tc',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: 'app/templates/tabs.html'
        };
        return directive;

        function link(scope, element, attrs) {
            var tree = element.find("#tree");
            tree.fancytree({
                extensions: ["edit", "glyph", "wide"],
                checkbox: true,
                glyph: treeData.glyph_opts,
                clickFolderMode: 3,
                selectMode: 3,
                source: treeData.source,
                toggleEffect: {
                    effect: "drop",
                    options: {
                        direction: "left"
                    },
                    duration: 400
                },
                wide: {
                    iconWidth: "1em", // Adjust this if @fancy-icon-width != "16px"
                    iconSpacing: "0.5em", // Adjust this if @fancy-icon-spacing != "3px"
                    levelOfs: "1.5em" // Adjust this if ul padding != "16px"
                }
            });
            tree.fancytree({
                select: function (event, data) {
                    if (data.node.isFolder()) {
                        var children = data.node.children;
                        if (data.node.isSelected()) {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                mapService.addLayer(el.data);
                            });
                        } else {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                mapService.removeLayer(el.data);
                            });
                        }
                    } else {
                        if (data.node.isSelected()) {
                            data.node.data.key = data.node.key;
                            mapService.addLayer(data.node.data);
                        } else {
                            data.node.data.key = data.node.key;
                            mapService.removeLayer(data.node.data);
                        }
                    }
                }
            });
        }
    }

    /* @ngInject */
    function tabsController($scope) {

    }
})();