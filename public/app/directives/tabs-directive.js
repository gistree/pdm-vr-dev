(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .directive('gesTabs', Directive);
    Directive.$inject = ['LayersFactory', 'MapService'];

    function Directive(LayersFactory, MapService) {
        var directive = {
            bindToController: true,
            controller: tabsController,
            controllerAs: 'tc',
            link: link,
            restrict: 'E',
            scope: {
                menuIsHidden: "="
            },
            templateUrl: 'app/templates/tabs.html'
        };
        return directive;

        function link(scope, element, attrs) {
            var tree = element.find("#tree").fancytree({
                extensions: ["edit", "glyph", "wide"],
                checkbox: true,
                glyph: LayersFactory.glyph_opts,
                clickFolderMode: 3,
                selectMode: 3,
                source: LayersFactory.source,
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
                },
                select: function (event, data) {
                    if (data.node.isFolder()) {
                        var children = data.node.children;
                        if (data.node.isSelected()) {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                MapService.addLayer(el.data);
                                _addLayer(el);
                            });
                        } else {
                            children.forEach(function (el) {
                                el.data.key = el.key;
                                MapService.removeLayer(el.data);
                                _removeLayer(el);
                            });
                        }
                    } else {
                        if (data.node.isSelected()) {
                            data.node.data.key = data.node.key;
                            MapService.addLayer(data.node.data);
                            _addLayer(data.node);
                        } else {
                            data.node.data.key = data.node.key;
                            MapService.removeLayer(data.node.data);
                            _removeLayer(data.node);
                        }
                    }
                    scope.$apply();
                }
            });
            scope.tree = element.find("#tree").fancytree("getTree");

            function _addLayer(layer) {
                var index = _findIndex(scope.groups, layer.parent);
                if (index > -1) {
                    scope.groups[index].data.push({
                        title: layer.title,
                        workspace: layer.data.workspace,
                        name: layer.data.name
                    });
                } else {
                    scope.groups.push({
                        title: layer.parent.title,
                        data: []
                    });
                    scope.groups[scope.groups.length - 1].data.push({
                        title: layer.title,
                        workspace: layer.data.workspace,
                        name: layer.data.name
                    });
                }
            };

            function _removeLayer(layer) {
                var index = _findIndex(scope.groups, layer.parent);
                var lIndex = _findIndex(scope.groups[index].data, layer);
                scope.groups[index].data.splice(lIndex, 1);
                if (scope.groups[index].data.length == 0) {
                    scope.groups.splice(index, 1);
                }
            };

            function _findIndex(array, data) {
                return array.findIndex(function (e) {
                    return e.title == this.title;
                }, data);
            }
        }
    }


    /* @ngInject */
    function tabsController($scope) {
        var tc = this;
        $scope.groups = [];
        tc.expandTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(true);
            });
        };
        tc.collapseTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(false);
            });
        };
        tc.deselectAll = function () {
            $scope.tree.visit(function (node) {
                node.setSelected(false);
            });
        };
        tc.hideMenu = function () {
            $scope.$parent.menuIsHidden = true;
        }
        tc.help = function () {
            alert(" Em Desenvolvimento... ");
        }
    }
})();