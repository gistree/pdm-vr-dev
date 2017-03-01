(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .directive('gesTabs', Directive);

    Directive.$inject = ['treeData', 'MapService'];

    function Directive(treeData, MapService) {
        MapService.init();
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
                    iconWidth: "1em", 
                    iconSpacing: "0.5em", 
                    levelOfs: "1.5em"
                }
            });
            tree.fancytree({
                select: function (event, data) {
                    if (data.node.isFolder()) {
                        var children = data.node.children;
                        if (data.node.isSelected()) {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                MapService.addLayer(el.data);
                            });
                        } else {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                MapService.removeLayer(el.data);
                            });
                        }
                    } else {
                        if (data.node.isSelected()) {
                            data.node.data.key = data.node.key;
                            MapService.addLayer(data.node.data);
                        } else {
                            data.node.data.key = data.node.key;
                            MapService.removeLayer(data.node.data);
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