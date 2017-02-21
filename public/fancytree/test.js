$(function() {
    $(document).ready(function() {
        glyph_opts = {
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
        };
        $("#tree").fancytree({
            extensions: ["edit", "glyph", "wide"],
            checkbox: true,
            glyph: glyph_opts,
            clickFolderMode: 3,
            selectMode: 3,
            source: [ // Pass an array of nodes.
                {
                    title: "Item 1",
                    children: [{
                        title: "Sub-item 1.1",
                        children: [
                            { title: "Sub-item 1.1.1" }
                        ]
                    }]
                },
                {
                    title: "Folder 2",
                    folder: true,
                    children: [
                        { title: "Sub-item 2.1" },
                        { title: "Sub-item 2.2" }
                    ]
                },
                {
                    title: "Item 3",
                    children: [{
                        title: "Sub-item 3.1",
                        children: [
                            { title: "Sub-item 3.1.1" }
                        ]
                    }]
                },
                {
                    title: "Folder 4",
                    folder: true,
                    expanded: true,
                    children: [{
                            title: "Folder 4.1",
                            folder: true,
                            children: [{
                                title: "Folder 4.1.1",
                                folder: true,
                                expanded: true,
                                children: [{
                                        title: "Item 4.1.1.1"
                                    },
                                    {
                                        title: "Item 4.1.1.2"
                                    },
                                    {
                                        title: "Item 4.1.1.3"
                                    },
                                    {
                                        title: "Item 4.1.1.4"
                                    }
                                ]
                            }]
                        },
                        {
                            title: "Folder 4.2",
                            folder: true,
                            children: [{
                                title: "Folder 4.2.1",
                                folder: true,
                                children: [{
                                        title: "Item 4.2.1.1"
                                    },
                                    {
                                        title: "Item 4.2.1.2"
                                    },
                                    {
                                        title: "Item 4.2.1.3"
                                    },
                                    {
                                        title: "Item 4.2.1.4"
                                    }
                                ]
                            }]
                        },
                        {
                            title: "Folder 4.3",
                            folder: true,
                            expanded: true,
                            children: [{
                                title: "Folder 4.3.1",
                                folder: true,
                                expanded: true,
                                children: [{
                                        title: "Item 4.3.1.1"
                                    },
                                    {
                                        title: "Item 4.3.1.2"
                                    },
                                    {
                                        title: "Item 4.3.1.3"
                                    },
                                    {
                                        title: "Item 4.3.1.4"
                                    }
                                ]
                            }]
                        },
                        {
                            title: "Folder 4.4",
                            folder: true,
                            children: [{
                                title: "Folder 4.4.1",
                                folder: true,
                                children: [{
                                        title: "Item 4.4.1.1"
                                    },
                                    {
                                        title: "Item 4.4.1.2"
                                    },
                                    {
                                        title: "Item 4.4.1.3"
                                    },
                                    {
                                        title: "Item 4.4.1.4"
                                    }
                                ]
                            }]
                        },
                        {
                            title: "Folder 4.5",
                            folder: true,
                            children: [{
                                title: "Folder 4.5.1",
                                folder: true,
                                children: [{
                                        title: "Item 4.5.1.1"
                                    },
                                    {
                                        title: "Item 4.5.1.2"
                                    },
                                    {
                                        title: "Item 4.5.1.3"
                                    },
                                    {
                                        title: "Item 4.5.1.4"
                                    }
                                ]
                            }]
                        },
                        {
                            title: "Folder 4.6",
                            folder: true,
                            children: [{
                                title: "Folder 4.6.1",
                                folder: true,
                                children: [{
                                        title: "Item 4.6.1.1"
                                    },
                                    {
                                        title: "Item 4.6.1.2"
                                    },
                                    {
                                        title: "Item 4.6.1.3"
                                    },
                                    {
                                        title: "Item 4.6.1.4"
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ],
            toggleEffect: { effect: "drop", options: { direction: "left" }, duration: 400 },
            wide: {
                iconWidth: "1em", // Adjust this if @fancy-icon-width != "16px"
                iconSpacing: "0.5em", // Adjust this if @fancy-icon-spacing != "3px"
                levelOfs: "1.5em" // Adjust this if ul padding != "16px"
            },
            select: function(event, data) {
                // Display list of selected nodes
                var selNodes = data.tree.getSelectedNodes();
                console.log(selNodes);
                // convert to title/key array
                var selKeys = $.map(selNodes, function(node) {
                    return "[" + node.key + "]: '" + node.title + "'";
                });
                $("#echo").text(selKeys.join(", "));
                /*
                                selNodes.forEach(function(node) {
                                    if (node.folder) {
                                        node.children.forEach(function(node) {
                                            node.setSelected(true);
                                        })
                                    }
                                });

                                
                                                var remove = 1;
                                                if (selNodes.length == 0) {
                                                    map.removeLayer(stamenLayer);
                                                } else {
                                                    selNodes.forEach(function(node) {
                                                        if (node.title == 'Item 1' && map.getLayers().array_.length == 1) {
                                                            map.addLayer(stamenLayer);
                                                            remove = 0;
                                                        }
                                                        if (remove == 1 && ) {
                                                            map.removeLayer(stamenLayer);
                                                        }
                                                    }, this);
                                                }*/
            },
            click: function(event, data) {
                // We should not toggle, if target was "checkbox", because this
                // would result in double-toggle (i.e. no toggle)
                if ($.ui.fancytree.getEventTargetType(event) === "title") {
                    data.node.toggleSelected();
                }
            },
        });

        $("#btnExpandAll").click(function() {
            $("#tree").fancytree("getTree").visit(function(node) {
                node.setExpanded(true);
            });
        });
        $("#btnCollapseAll").click(function() {
            $("#tree").fancytree("getTree").visit(function(node) {
                node.setExpanded(false);
            });
        });
        $("#btnDeselectAll").click(function() {
            $("#tree").fancytree("getTree").visit(function(node) {
                node.setSelected(false);
            });
        });

        $("#hide_left_menu").click(function() {
            $('#leftmenu-col').hide();
            $("#map-col").removeClass();
            $("#map-col").addClass("col-12");
            if (!$('#sidebar-show-btn').length) {
                $("<button class='btn btn-inverse' type='button' data-placement='bottom' title='Mostrar painel' id='show_left_menu' onclick='show_left_menu();'><span class='fa fa-arrow-circle-o-right'></span></button>").insertBefore("#firstButton");
            }
            map.updateSize();
        });

        $("#btnSortAll").click(function() {
            $("#tree").fancytree("getRootNode").sortChildren(null, true);
        })

        window.show_left_menu = function() {
            $('#leftmenu-col').show();
            $("#map-col").removeClass();
            $("#map-col").addClass("col-9");
            $("#show_left_menu").remove();
            map.updateSize();
        };
    });
});