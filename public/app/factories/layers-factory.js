(function () {
    'use strict';
    angular
        .module('gestreeApp')
        .factory('LayersFactory', LayersFactory)

    function LayersFactory() {
        return {
            glyph_opts: {
                map: {
                    doc: "fa fa-file-o",
                    docOpen: "fa fa-file",
                    checkbox: "fa fa-square-o",
                    checkboxSelected: "fa fa-check-square",
                    checkboxUnknown: "fa fa-spinner",
                    error: "fa fa-exclamation-triangle",
                    expanderClosed: "fa  fa-arrow-right",
                    expanderLazy: "fa fa-arrow-right", // glyphicon-plus-sign
                    expanderOpen: "fa fa-arrow-down", // glyphicon-collapse-down
                    folder: "fa  fa-folder",
                    folderOpen: "fa fa-folder-open",
                    loading: "fa fa-spinner"
                }
            },
            source: [{
                    title: "Reservas",
                    folder: true,
                    expanded: true,
                    children: [{
                            title: "Reserva Agrícola Nacional",
                            data: {
                                workspace: "PDM-VilaReal",
                                name: "RESERVA_AGRICOLA_NACIONAL",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 1
                            }
                        },
                        {
                            title: "Reserva Ecológica Nacional",
                            data: {
                                workspace: "PDM-VilaReal",
                                name: "RESERVA_ECOLOGICA_NACIONAL",
                                type: "Raster",
                                extent: [-127028.95781617332, -301620.79631591577, 173162.9865501142, 278637.28586892004],
                                opacity: 0.7
                            }
                        }
                    ]
                },
                {
                    title: "Outras",
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