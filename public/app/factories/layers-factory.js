(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .factory('LayersFactory', LayersFactory)

    function LayersFactory() {
        var layers = [{
                title: "Condicionantes",
                folder: true,
                expanded: true,
                children: [{
                        title: "Reserva Agrícola Nacional",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "reserva_agricola_nacional",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1,
                            minZoom: 12
                        }
                    },
                    {
                        title: "Reserva Ecológica Nacional",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "reserva_ecologica_nacional",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 0.7
                        }
                    }
                ]
            },
            {
                title: "Ordenamento",
                folder: true,
                expanded: true,
                children: [{
                        title: "Solo Rural",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_rural",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 0.9
                        }
                    },
                    {
                        title: "Solo Urbano",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_urbano",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Solo Urbanização Programada",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "solo_de_urbanizacao_programada",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Estrutura Ecológica Urbana",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "estrutura_ecologica_urbana",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    },
                    {
                        title: "Outras Instalações",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "outras_instalacoes",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    }
                    ,
                    {
                        title: "Zonas de Proteção ao Aeródromo",
                        data: {
                            workspace: "cmvrpostgis",
                            name: "zonas_de_protecao_ao_aerodromo",
                            type: "Raster",
                            extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                            opacity: 1
                        }
                    }
                ]
            },
            {
                title: "Enquadramento",
                folder: true,
                expanded: false,
                children: [{
                        title: "Edifícios",
                        preselected: true,
                        data: {
                            workspace: "cmvrpostgis",
                            name: "edificios",
                            type: "Raster",
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
                            type: "Raster",
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
                            type: "Raster",
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