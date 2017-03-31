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
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Reserva Ecológica Nacional",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "reserva_ecologica_nacional",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Zonas Inundáveis",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "zonas_inundaveis",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Pedreiras",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "pedreiras",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Limite da Rede Natura",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "limite_da_rede_natura_2000",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Aeródromo",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "aerodromo",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Linhas de Alta Tensão",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "linhas_de_alta_tensao",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Abastecimento de Águas Adutoras",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "abastecimento_de_aguas_adutoras",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Rede Rodoviária",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "rede_rodoviaria",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Rede Rodoviária Prevista",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "rede_rodoviaria_prevista",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Rede Ferroviária",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "rede_ferroviaria",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Vértices Geodésicos",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "vertices_geodesicos",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
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
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Solo Urbano",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_urbano",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Solo Urbanização Programada",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_de_urbanizacao_programada",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Estrutura Ecológica Urbana",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "estrutura_ecologica_urbana",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Outras Instalações",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "outras_instalacoes",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Zonas de Proteção ao Aeródromo",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "zonas_de_protecao_ao_aerodromo",
                            type: "TileWMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
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
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1,
                            minZoom: 17
                        }
                    },
                    {
                        title: "Limite Freguesias",
                        preselected: true,
                        data: {
                            workspace: "cmvrpostgis",
                            name: "limite_freguesias",
                            type: "WMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Limite Concelho",
                        preselected: true,
                        data: {
                            workspace: "cmvrpostgis",
                            name: "limite_concelho",
                            type: "WMS",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
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
        return {
            glyph_opts: {
                map: {
                    checkbox: "fa fa-toggle-off",
                    checkboxSelected: "fa fa-toggle-on",
                    checkboxUnknown: "fa fa-circle",
                    error: "fa fa-exclamation-triangle",
                    expanderClosed: "fa  fa-arrow-right",
                    expanderLazy: "fa fa-arrow-right", // glyphicon-plus-sign
                    expanderOpen: "fa fa-arrow-down", // glyphicon-collapse-down
                    folder: "fa fa-folder",
                    folderOpen: "fa fa-folder-open",
                    loading: "fa fa-spinner"
                }
            },
            source: setLayerOrder(layers)
        }
    };
})();