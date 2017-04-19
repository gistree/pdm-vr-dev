(function () {
    'use strict';

    angular
        .module('MapModule')
        .controller('BaseDocumentalController', BaseDocumentalController);

    function BaseDocumentalController() {
        var bd = this;

        activate();

        function activate() {
            bd.baseAddress = "http://www.cm-vilareal.pt/images/cidadao/urbanismo/PDM/";
            bd.items = [{
                title: "Plantas de Condicionantes",
                content: [{
                    name: "Áreas Florestais Percorridas por Incêndio | PLANTA-A",
                    address: "ordenamento/areas_florestais_percorridas_incendio_planta_a.pdf"
                }, {
                    name: "Áreas Florestais Percorridas por Incêndio | PLANTA-B",
                    address: "ordenamento/acustico_dia_planta_b.pdf"
                }, {
                    name: "Perigosidade de Incêndio | PLANTA-A",
                    address: "ordenamento/risco_incendio_planta_a.pdf"
                }, {
                    name: "Perigosidade de Incêndio | PLANTA-B",
                    address: "ordenamento/risco_incendio_planta_b.pdf"
                }, {
                    name: "Planta de Condicionantes | PLANTA-A",
                    address: "ordenamento/condicionantes_planta_a.pdf"
                }, {
                    name: "Planta de Condicionantes | PLANTA-B",
                    address: "ordenamento/condicionantes_planta_b.pdf"
                }, {
                    name: "Planta de Condicionantes | PLANTA-C",
                    address: "ordenamento/condicionantes_planta_c.pdf"
                }, {
                    name: "Planta de Condicionantes | PLANTA-D",
                    address: "ordenamento/condicionantes_planta_d.pdf"
                }, {
                    name: "Planta de Condicionantes | PLANTA-E",
                    address: "ordenamento/condicionantes_planta_e.pdf"
                }, {
                    name: "Planta de Condicionantes | PLANTA-F",
                    address: "ordenamento/condicionantes_planta_f.pdf"
                }, {
                    name: "Planta de Condicionantes | PLANTA-G",
                    address: "ordenamento/condicionantes_planta_g.pdf"
                }]
            }, {
                title: "Plantas de Ordenamento",
                content: [{
                    name: "Qualificação do Solo | PLANTA-A",
                    address: "ordenamento/solo_planta_a.pdf"
                }, {
                    name: "Qualificação do Solo | PLANTA-B",
                    address: "ordenamento/solo_planta_b.pdf"
                }, {
                    name: "Qualificação do Solo | PLANTA-C",
                    address: "ordenamento/solo_planta_c.pdf"
                }, {
                    name: "Qualificação do Solo | PLANTA-D",
                    address: "ordenamento/solo_planta_d.pdf"
                }, {
                    name: "Qualificação do Solo | PLANTA-E",
                    address: "ordenamento/solo_planta_e.pdf"
                }, {
                    name: "Qualificação do Solo | PLANTA-F",
                    address: "ordenamento/solo_planta_f.pdf"
                }, {
                    name: "Qualificação do Solo | PLANTA-G",
                    address: "ordenamento/solo_planta_g.pdf"
                }, {
                    name: "Zonamento Acústico (dia) | PLANTA-A",
                    address: "ordenamento/acustico_dia_planta_a.pdf"
                }, {
                    name: "Zonamento Acústico (dia) | PLANTA-B",
                    address: "ordenamento/acustico_dia_planta_b.pdf"
                }, {
                    name: "Zonamento Acústico (noite) | PLANTA-A",
                    address: "ordenamento/acustico_noite_planta_a.pdf"
                }, {
                    name: "Zonamento Acústico (noite) | PLANTA-B",
                    address: "ordenamento/acustico_noite_planta_a.pdf"
                }]
            }, {
                title: "Regulamento",
                content: [{
                    name: "Regulamento do Plano Diretor Municipal (Aviso n.º 7317 de 2011)",
                    address: "ordenamento/aviso7317_2011_PDMVR.pdf"
                }]
            }, {
                title: "Correcções Materiais",
                content: [{
                    name: "Correção material do Plano Diretor Municipal de Vila Real - DR n.º 178/2013",
                    address: "dr_178_2013.pdf"
                }, {
                    name: "Correção material do Plano Diretor Municipal de Vila Real - DR n.º 29/2014",
                    address: "dr_29_2014.pdf"
                }, {
                    name: "Correção material do Plano Diretor Municipal de Vila Real - DR n.º 202/2014",
                    address: "dr_229_2014.pdf"
                }]
            }, {
                title: "Relatório de Discussão Pública",
                content: [{
                    name: "Relatório de Discussão Pública",
                    address: "relat_discussao_publica_pdm.pdf"
                }]
            }];
        };
    }
})();