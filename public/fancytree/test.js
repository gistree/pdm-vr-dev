$(function() {
    $(document).ready(function() {
        $("#hide_left_menu").click(function() {
            $('#leftmenu-col').hide();
            $("#map-col").removeClass();
            $("#map-col").addClass("col-12");
            if (!$('#sidebar-show-btn').length) {
                $("<button class='btn btn-inverse' type='button' data-placement='bottom' title='Mostrar painel' id='show_left_menu' onclick='show_left_menu();'><span class='fa fa-arrow-right'></span></button>").insertBefore("#firstButton");
            }
            map.updateSize();
        });

        window.show_left_menu = function() {
            $('#leftmenu-col').show();
            $("#map-col").removeClass();
            $("#map-col").addClass("col-9");
            $("#show_left_menu").remove();
            map.updateSize();
        };

        //MODAL CONFIG 
        $("#btnInfo").click(function(e) {
            modalNodes = $("#tree").fancytree("getTree").getSelectedNodes();

            var modalHeader = '<div id="infoModal" class="modal fade" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
            modalHeader += '<div class="modal-dialog modal-lg">';
            modalHeader += '<div class="modal-content">';
            modalHeader += '<div class="modal-header">';
            var modalTitle = '<h4 class="modal-title">' + modalNodes[0].title + '</h4><button type="button" class="close" data-dismiss="modal">×</button></div>';
            var modalBody = '<div class="modal-body">'
            modalBody += 'formContent</div>';
            var modalFooter1 = '<div class="modal-footer">';
            var modalPages1 = '<nav aria-label="Pages">';
            modalPages1 += '<ul class="pagination justify-content-center" id="jaestouaficarfarto">';
            modalPages1 += '<li class="page-item"><a class="page-link" href="#" tabindex="-1">Previous</a></li>';
            var modalPages2 = '<li class="page-item"><a class="page-link" href="#">Next</a></li></ul></nav>';
            var modalFooter2 = '<button class="btn btn-default" data-dismiss="modal">Close</button>';
            var modalEnd = '</div></div></div></div>';

            if (modalNodes.length == 1) {
                console.log('titulo' + ($("#tree").fancytree("getTree").getSelectedNodes())[0].title)
                var html = modalHeader + modalTitle + modalBody + modalFooter1 + modalFooter2 + modalEnd;
                $('body').append(html);
                modalNodes.clear;
                $("#infoModal").modal();
                $("#infoModal").on('hidden.bs.modal', function() {
                    $(this).remove();
                });
            }

            if (modalNodes.length > 1) {
                var modalTitles = [];
                var itemNodes = [];
                var modalNodes = $("#tree").fancytree("getTree").getSelectedNodes();
                modalNodes.forEach(function(node) {
                    if (!node.folder) {
                        itemNodes.push(node);
                    };
                });
                var createPages = "";
                var pages = [];
                for (var i = 1, x = itemNodes.length + 1; i < x; i++) {
                    if (i == 1) {
                        var page = '<li class="page-item"><a class="page-link"' + 'id="page' + i + '" href="#">' + i + '</a></li>';
                        createPages += page;
                        pages.push(page);
                        modalTitles[i - 1] = '<h4 class="modal-title" id="modaltitle">' + itemNodes[i - 1].title + '</h4><button type="button" class="close" data-dismiss="modal">×</button></div>';
                    } else if (i < 4) {
                        var page = '<li class="page-item"><a class="page-link"' + 'id="page' + i + '" href="#">' + i + '</a></li>';
                        createPages += page;
                        pages.push(page);
                        modalTitles[i - 1] = '<h4 class="modal-title">' + itemNodes[i - 1].title + '</h4><button type="button" class="close" data-dismiss="modal">×</button></div>';
                    } else {
                        break;
                    }
                };
                var pagesHTML = [];
                pages.forEach(function(page) {
                    pagesHTML.push($.parseHTML(page));
                });

                var html = modalHeader + modalTitles[0] + modalBody + modalFooter1 + modalPages1 + modalPages2 + modalEnd;

                $('body').append(html);
                $('#jaestouaficarfarto').append(pagesHTML[0]);
                $('#jaestouaficarfarto').append(pagesHTML[1]);
                $('#jaestouaficarfarto').append(pagesHTML[2]);

                function generateClickHandler(j) {
                    return function(event) {
                        document.getElementById('page' + j).parentNode.setAttribute('class', 'page-item');
                        document.getElementById('modaltitle').innerText = itemNodes[j - 1].title;
                        var centerPage = parseInt(document.getElementById('page' + j).parentNode.parentNode.children[2].children[0].text);
                        var leftPage = centerPage + 1;
                        var rightPage = centerPage + 2;
                        document.getElementById('page' + leftPage).parentNode.parentNode.children[2].replaceWith(pagesHTML[j - 1][0]);
                        document.getElementById('page' + centerPage).parentNode.parentNode.children[3].replaceWith(pagesHTML[j][0]);
                        document.getElementById('page' + rightPage).parentNode.parentNode.children[4].replaceWith(pagesHTML[j + 1][0]);
                    };
                }

                modalNodes.clear;
                $("#infoModal").modal();

                for (var i = 1, x = pagesHTML.length + 1; i < x; i++) {
                    console.log(i);
                    $('#page' + i).click(generateClickHandler(i));
                }

                $("#infoModal").on('hidden.bs.modal', function() {
                    $(this).remove();
                });
            };
        });
    });
});