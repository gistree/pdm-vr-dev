(function () {
    'use strict';
    angular
        .module('MapModule')
        .factory('LayersFactory', LayersFactory);

    function LayersFactory() {
        var layers = [{
                title: "Condicionantes",
                folder: true,
                expanded: false,
                children: [{
                        title: "Reserva Agrícola Nacional",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "reserva_agricola_nacional",
                            type: "TileWMS",
                            extent: [18766.638671875, 169217.796875, 43913.2890625, 193993.140625],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Reserva Ecológica Nacional",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "reserva_ecologica_nacional",
                            type: "TileWMS",
                            extent: [17611.111328125, 167813.078125, 43707.05859375, 194903.828125],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Zonas Inundáveis",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "zonas_inundaveis",
                            type: "TileWMS",
                            extent: [27244.9114809302, 177243.61450175, 41852.2031466667, 189472.103570326],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Pedreiras",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "pedreiras",
                            type: "TileWMS",
                            extent: [31301, 178579, 41093.41, 190632.45],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Limite da Rede Natura",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "limite_da_rede_natura_2000",
                            type: "TileWMS",
                            extent: [17740.3000053704, 171533.053579776, 40013.0868021306, 194769.710001934],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Aeródromo",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "aerodromo",
                            type: "TileWMS",
                            extent: [34331.448827946, 177917.382271892, 34841.7445349963, 178924.526851403],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Linhas de Alta Tensão",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "linhas_de_alta_tensao",
                            type: "TileWMS",
                            extent: [17843.5054611179, 171303.709982924, 41964.3228092712, 193773.342089996],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Abastecimento de Águas Adutoras",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "abastecimento_de_aguas_adutoras",
                            type: "TileWMS",
                            extent: [20487.740234375, 171527.75, 41165.7734375, 186798.828125],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Rede Rodoviária",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "rede_rodoviaria",
                            type: "TileWMS",
                            extent: [16256.658203125, 170863.625, 44522.0078125, 192233.984375],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Rede Rodoviária Prevista",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "rede_rodoviaria_prevista",
                            type: "TileWMS",
                            extent: [29997.7402124873, 177120.447071248, 41954.7321947515, 183448.040850479],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Rede Ferroviária",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "rede_ferroviaria",
                            type: "TileWMS",
                            extent: [31424.05859375, 171505.453125, 37849.6171875, 193419.1875],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Vértices Geodésicos",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "vertices_geodesicos",
                            type: "TileWMS",
                            extent: [18029.923828125, 171169.359375, 43374.625, 193767.53125],
                            opacity: 1,
                            queryable: true
                        }
                    }
                ]
            },
            {
                title: "Ordenamento",
                folder: true,
                expanded: false,
                children: [{
                        title: "Solo Rural",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_rural",
                            type: "TileWMS",
                            extent: [17606.0390625, 167813.078125, 44726.4296875, 194903.828125],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Solo Urbano",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_urbano",
                            type: "TileWMS",
                            extent: [20274.8671875, 170510.4375, 43669.11328125, 193721.0625],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Solo Urbanização Programada",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_de_urbanizacao_programada",
                            type: "TileWMS",
                            extent: [23145.26953125, 176716.625, 43091.53515625, 187579.03125],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Estrutura Ecológica Urbana",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "estrutura_ecologica_urbana",
                            type: "TileWMS",
                            extent: [20556.63671875, 170877.609375, 43327.91015625, 190965.9375],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Outras Instalações",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "outras_instalacoes",
                            type: "TileWMS",
                            extent: [31896.716796875, 175867.421875, 35477.484375, 183670.53125],
                            opacity: 1,
                            queryable: true
                        }
                    },
                    {
                        title: "Zonas de Proteção ao Aeródromo",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "zonas_de_protecao_ao_aerodromo",
                            type: "TileWMS",
                            extent: [29641.623046875, 173227.484375, 39421.3359375, 183633.4375],
                            opacity: 1,
                            queryable: true
                        }
                    }
                ]
            },
            {
                title: "Enquadramento",
                folder: true,
                expanded: true,
                children: [{
                        title: "Edifícios",
                        preselected: true,
                        data: {
                            workspace: "cmvrpostgis",
                            name: "edificios",
                            type: "TileWMS",
                            extent: [18766.4261249, 168284.50999, 45232.348, 193945.9475],
                            opacity: 1,
                            minZoom: 17,
                            queryable: false
                        }
                    },
                    {
                        title: "Limite Freguesias",
                        preselected: true,
                        data: {
                            workspace: "cmvrpostgis",
                            name: "limite_freguesias",
                            type: "WMS",
                            extent: [17736.5093, 167946.442199999, 44587.9413999999, 194768.479699999],
                            opacity: 1,
                            queryable: false
                        }
                    },
                    {
                        title: "Limite Concelho",
                        preselected: true,
                        data: {
                            workspace: "cmvrpostgis",
                            name: "limite_concelho",
                            type: "WMS",
                            extent: [17736.5093, 167946.442199999, 44587.9413999999, 194768.479699999],
                            opacity: 1,
                            queryable: false
                        }
                    }
                ]
            }
        ];

        function setLayerOrder(l) {
            var groupIndex = 0;
            l.forEach(function (group) {
                groupIndex++;
                group.children.forEach(function (layer) {
                    layer.data.group = groupIndex;
                });
            });
            return l;
        };

        function addLayer(grp) {
            layers.forEach(function (l) {
                if (l.title == grp.title) {
                    grp.children.forEach(function (layer) {
                        l.children.unshift(layer);
                    });
                }
            });
            $("#tree").fancytree('getTree').reload(setLayerOrder(layers));
        }

        function removeProtectedLayers() {
            $("#tree").fancytree("getTree").visit(function (node) {
                if (!node.isFolder()) {
                    if (node.data.protected) {
                        node.remove();
                    }
                }
            });
        }

        return {
            glyph_opts: {
                map: {
                    checkbox: "fa fa-toggle-off",
                    checkboxSelected: "fa fa-toggle-on",
                    checkboxUnknown: "fa fa-circle",
                    doc: "fa fa-search",
                    docOpen: "fa fa-search",
                    error: "fa fa-exclamation-triangle",
                    expanderClosed: "fa  fa-arrow-right",
                    expanderLazy: "fa fa-arrow-right", // glyphicon-plus-sign
                    expanderOpen: "fa fa-arrow-down", // glyphicon-collapse-down
                    folder: "fa fa-folder",
                    folderOpen: "fa fa-folder-open",
                    loading: "fa fa-spinner"
                }
            },
            source: setLayerOrder(layers),
            addLayer: addLayer,
            removeProtectedLayers: removeProtectedLayers
        }
    };
})();