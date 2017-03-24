(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .factory('LayersFactory', LayersFactory)

    function LayersFactory() {
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
            source: [{
                    title: "Condicionantes",
                    folder: true,
                    expanded: true,
                    children: [{
                            title: "Reserva Agrícola Nacional",
                            data: {
                                workspace: "PDM-VilaReal-database",
                                name: "RESERVA_AGRICOLA_NACIONAL",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 1,
                                index: 1,
                                minZoom: 12,
                                maxZoom: 14
                            }
                        },
                        {
                            title: "Reserva Ecológica Nacional",
                            data: {
                                workspace: "PDM-VilaReal-database",
                                name: "RESERVA_ECOLOGICA_NACIONAL",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.7,
                                index: 2
                            }
                        }
                    ]
                },
                {
                    title: "Ordenamento",
                    folder: true,
                    expanded: true,
                    children: [{

                            title: "Rede Rodoviária",
                            data: {
                                workspace: "PDM-VilaReal",
                                name: "REDE_RODOVIÁRIA",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.7
                            }
                        },
                        {
                            title: "Zona Aeródromo Raster",
                            data: {
                                workspace: "PDM-VilaReal-Database",
                                name: "aerodromo",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.9
                            }
                        },
                        {
                            title: "Zona Aeródromo Vector",
                            data: {
                                workspace: "PDM-VilaReal",
                                name: "AERÓDROMO",
                                type: "Vector",
                                style: {
                                    fill: new ol.style.Fill({
                                        color: '#dd0000'
                                    })
                                },
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.8
                            }
                        }
                    ]
                },
                {
                    title: "Enquadramento",
                    folder: true,
                    expanded: true,
                    children: [{

                            title: "Rede Rodoviária",
                            data: {
                                workspace: "PDM-VilaReal",
                                name: "REDE_RODOVIÁRIA",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.7
                            }
                        },
                        {
                            title: "Zona Aeródromo Raster",
                            data: {
                                workspace: "PDM-VilaReal-Database",
                                name: "aerodromo",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.9
                            }
                        },
                        {
                            title: "Zona Aeródromo Vector",
                            data: {
                                workspace: "PDM-VilaReal",
                                name: "AERÓDROMO",
                                type: "Vector",
                                style: {
                                    fill: new ol.style.Fill({
                                        color: '#dd0000'
                                    })
                                },
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.8
                            }
                        }
                    ]
                }
            ]
        }
    };
})();