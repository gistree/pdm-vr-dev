!function(){"use strict";angular.module("MapModule",[])}(),function(){"use strict";function a(a){function b(a){proj4.defs("EPSG:27493","+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");var b=[-127101.82,-300782.39,160592.41,278542.12],c=ol.proj.get("EPSG:27493");c.setExtent(b),q=angular.extend(p,a),o=new ol.Map({target:q.target,layers:[new ol.layer.Tile({source:new ol.source.OSM({}),queryable:!1})],interactions:q.interactions,controls:q.controls,view:new ol.View({center:ol.proj.transform(q.center,"EPSG:4326","EPSG:3857"),zoom:q.zoom,extent:[-928405.1144335504,5033494.2861691285,-777977.0427683234,5078592.132857382],minZoom:11})}),o.getView().on("change:resolution",function(a){var b=a.target.getZoom();b===parseInt(b,10)&&$("#tree").fancytree("getTree").visit(function(a){a.isFolder()||void 0!=a.data.minZoom&&(a.data.minZoom<b?a.removeClass("layer-hidden"):a.addClass("layer-hidden"))})})}function c(a){o.getLayers().setAt(0,a)}function d(a){"WMS"===a.type?f(a):"TileWMS"===a.type?e(a):l(a)}function e(a){if(j(a.key)){var b=new ol.layer.Tile({opacity:a.opacity,source:new ol.source.TileWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:a.workspace+":"+a.name},extent:a.extent}),minResolution:k(a.maxZoom),maxResolution:k(a.minZoom),group:a.group,queryable:a.queryable});m[a.key]=b,o.getLayers().insertLayer(b),m[a.key].visible=!0}else m[a.key].visible||(o.getLayers().insertLayer(m[a.key]),m[a.key].visible=!0)}function f(a){if(j(a.key)){var b=new ol.layer.Image({opacity:a.opacity,source:new ol.source.ImageWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:a.workspace+":"+a.name},extent:a.extent}),minResolution:k(a.maxZoom),maxResolution:k(a.minZoom),group:a.group,queryable:a.queryable});m[a.key]=b,o.getLayers().insertLayer(b),m[a.key].visible=!0}else m[a.key].visible||(o.getLayers().insertLayer(m[a.key]),m[a.key].visible=!0)}function g(a){m[a.key]&&(o.removeLayer(m[a.key]),m[a.key].visible=!1)}function h(){o.setView(new ol.View({center:ol.proj.transform(q.center,"EPSG:4326","EPSG:3857"),zoom:q.zoom,extent:[-928405.1144335504,5033494.2861691285,-777977.0427683234,5078592.132857382],minZoom:11}))}function i(a,b){var c=o.getView();window.view=c,o.getView().animate({zoom:11,duration:500},{center:ol.proj.transform(a,ol.proj.get(b),"EPSG:3857"),duration:1500,zoom:15})}function j(a){return!m.hasOwnProperty(a)}function k(a){return"undefined"==typeof a?a:Math.floor(156543.04/Math.pow(2,a))}function l(a){if(j(a.key)){var b=new ol.layer.Vector({source:new ol.source.Vector({loader:function(c){$.ajax("http://gistree.espigueiro.pt/geoserver/wfs",{type:"GET",data:{service:"WFS",version:"1.1.1",request:"GetFeature",typename:a.workspace+":"+a.name,srsname:"EPSG:27493",outputFormat:"application/json",bbox:ol.proj.transformExtent(c,"EPSG:3857",ol.proj.get("EPSG:27493")).join(",")+","+ol.proj.get("EPSG:27493").getCode()},crossDomain:!0}).done(function(a){b.getSource().addFeatures((new ol.format.GeoJSON).readFeatures(a,{featureProjection:"EPSG:3857",dataProjection:ol.proj.get("EPSG:27493")}))})},strategy:ol.loadingstrategy.bbox})});m[a.key]=b,a.style&&(b.setStyle(new ol.style.Style(a.style)),b.setOpacity(a.opacity)),o.addLayer(b),m[a.key].visible=!0}else m[a.key].visible||(o.addLayer(m[a.key]),m[a.key].visible=!0)}var m={},n={};if(!ol)return{};var o={},p={zoom:11,target:"map",center:[-7.7464,41.2951],interactions:[new ol.interaction.MouseWheelZoom,new ol.interaction.DragPan],controls:[new ol.control.ScaleLine,new ol.control.OverviewMap({className:"ol-overviewmap ol-custom-overviewmap",layers:[new ol.layer.Image({source:new ol.source.ImageWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:"cmvrpostgis:limite_freguesias"},extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004]})}),new ol.layer.Image({source:new ol.source.ImageWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:"cmvrpostgis:limite_concelho"},extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004]})})],collapseLabel:"-",label:"+",collapsed:!1,tipLabel:""})]},q={};angular.equals(o,{})&&b();var r={map:o,init:b,addLayer:d,removeLayer:g,setDefaultView:h,userFeatures:n,setBaseLayer:c,zoomToCoordinate:i};return r}angular.module("MapModule").factory("MapService",a),a.$inject=["$http"],ol.Collection.prototype.insertLayer=function(a){var b=this.getArray().findIndex(function(b){return b.get("group")<a.get("group")});b!==-1?this.insertAt(b,a):this.push(a)},ol.layer.Base.prototype.isQueryable=function(){return this.get("queryable")}}(),function(){"use strict";function a(){function a(a){var b=0;return a.forEach(function(a){b++,a.children.forEach(function(a){a.data.group=b})}),a}function b(b){d.forEach(function(a){a.title==b.title&&b.children.forEach(function(b){a.children.unshift(b)})}),$("#tree").fancytree("getTree").reload(a(d))}function c(){$("#tree").fancytree("getTree").visit(function(a){a.isFolder()||a.data.protected&&a.remove()})}var d=[{title:"Condicionantes",folder:!0,expanded:!1,children:[{title:"Reserva Agrícola Nacional",data:{workspace:"cmvrpostgis",name:"reserva_agricola_nacional",type:"TileWMS",extent:[18766.638671875,169217.796875,43913.2890625,193993.140625],opacity:1,queryable:!0}},{title:"Reserva Ecológica Nacional",data:{workspace:"cmvrpostgis",name:"reserva_ecologica_nacional",type:"TileWMS",extent:[17611.111328125,167813.078125,43707.05859375,194903.828125],opacity:1,queryable:!0}},{title:"Zonas Inundáveis",data:{workspace:"cmvrpostgis",name:"zonas_inundaveis",type:"TileWMS",extent:[27244.9114809302,177243.61450175,41852.2031466667,189472.103570326],opacity:1,queryable:!0}},{title:"Pedreiras",data:{workspace:"cmvrpostgis",name:"pedreiras",type:"TileWMS",extent:[31301,178579,41093.41,190632.45],opacity:1,queryable:!0}},{title:"Limite da Rede Natura",data:{workspace:"cmvrpostgis",name:"limite_da_rede_natura_2000",type:"TileWMS",extent:[17740.3000053704,171533.053579776,40013.0868021306,194769.710001934],opacity:1,queryable:!0}},{title:"Aeródromo",data:{workspace:"cmvrpostgis",name:"aerodromo",type:"TileWMS",extent:[34331.448827946,177917.382271892,34841.7445349963,178924.526851403],opacity:1,queryable:!0}},{title:"Linhas de Alta Tensão",data:{workspace:"cmvrpostgis",name:"linhas_de_alta_tensao",type:"TileWMS",extent:[17843.5054611179,171303.709982924,41964.3228092712,193773.342089996],opacity:1,queryable:!0}},{title:"Abastecimento de Águas Adutoras",data:{workspace:"cmvrpostgis",name:"abastecimento_de_aguas_adutoras",type:"TileWMS",extent:[20487.740234375,171527.75,41165.7734375,186798.828125],opacity:1,queryable:!0}},{title:"Rede Rodoviária",data:{workspace:"cmvrpostgis",name:"rede_rodoviaria",type:"TileWMS",extent:[16256.658203125,170863.625,44522.0078125,192233.984375],opacity:1,queryable:!0}},{title:"Rede Rodoviária Prevista",data:{workspace:"cmvrpostgis",name:"rede_rodoviaria_prevista",type:"TileWMS",extent:[29997.7402124873,177120.447071248,41954.7321947515,183448.040850479],opacity:1,queryable:!0}},{title:"Rede Ferroviária",data:{workspace:"cmvrpostgis",name:"rede_ferroviaria",type:"TileWMS",extent:[31424.05859375,171505.453125,37849.6171875,193419.1875],opacity:1,queryable:!0}},{title:"Vértices Geodésicos",data:{workspace:"cmvrpostgis",name:"vertices_geodesicos",type:"TileWMS",extent:[18029.923828125,171169.359375,43374.625,193767.53125],opacity:1,queryable:!0}}]},{title:"Ordenamento",folder:!0,expanded:!1,children:[{title:"Solo Rural",data:{workspace:"cmvrpostgis",name:"solo_rural",type:"TileWMS",extent:[17606.0390625,167813.078125,44726.4296875,194903.828125],opacity:1,queryable:!0}},{title:"Solo Urbano",data:{workspace:"cmvrpostgis",name:"solo_urbano",type:"TileWMS",extent:[20274.8671875,170510.4375,43669.11328125,193721.0625],opacity:1,queryable:!0}},{title:"Solo Urbanização Programada",data:{workspace:"cmvrpostgis",name:"solo_de_urbanizacao_programada",type:"TileWMS",extent:[23145.26953125,176716.625,43091.53515625,187579.03125],opacity:1,queryable:!0}},{title:"Estrutura Ecológica Urbana",data:{workspace:"cmvrpostgis",name:"estrutura_ecologica_urbana",type:"TileWMS",extent:[20556.63671875,170877.609375,43327.91015625,190965.9375],opacity:1,queryable:!0}},{title:"Outras Instalações",data:{workspace:"cmvrpostgis",name:"outras_instalacoes",type:"TileWMS",extent:[31896.716796875,175867.421875,35477.484375,183670.53125],opacity:1,queryable:!0}},{title:"Zonas de Proteção ao Aeródromo",data:{workspace:"cmvrpostgis",name:"zonas_de_protecao_ao_aerodromo",type:"TileWMS",extent:[29641.623046875,173227.484375,39421.3359375,183633.4375],opacity:1,queryable:!0}}]},{title:"Enquadramento",folder:!0,expanded:!0,children:[{title:"Edifícios",preselected:!0,data:{workspace:"cmvrpostgis",name:"edificios",type:"TileWMS",extent:[18766.4261249,168284.50999,45232.348,193945.9475],opacity:1,minZoom:17,queryable:!1}},{title:"Limite Freguesias",preselected:!0,data:{workspace:"cmvrpostgis",name:"limite_freguesias",type:"WMS",extent:[17736.5093,167946.442199999,44587.9413999999,194768.479699999],opacity:1,queryable:!1}},{title:"Limite Concelho",preselected:!0,data:{workspace:"cmvrpostgis",name:"limite_concelho",type:"WMS",extent:[17736.5093,167946.442199999,44587.9413999999,194768.479699999],opacity:1,queryable:!1}}]}];return{glyph_opts:{map:{checkbox:"fa fa-toggle-off",checkboxSelected:"fa fa-toggle-on",checkboxUnknown:"fa fa-circle",doc:"fa fa-search",docOpen:"fa fa-search",error:"fa fa-exclamation-triangle",expanderClosed:"fa  fa-arrow-right",expanderLazy:"fa fa-arrow-right",expanderOpen:"fa fa-arrow-down",folder:"fa fa-folder",folderOpen:"fa fa-folder-open",loading:"fa fa-spinner"}},source:a(d),addLayer:b,removeProtectedLayers:c}}angular.module("MapModule").factory("LayersFactory",a)}(),function(){"use strict";function a(a){function b(b){a({method:"GET",url:"/api/freguesias"}).then(function(a){b(a.data)},function(a){console.error(a)})}function c(b){a({method:"GET",url:"/api/localidades"}).then(function(a){b(a.data)},function(a){console.error(a)})}var d={getFreguesias:b,getLocalidades:c};return d}angular.module("MapModule").factory("LocationsFactory",a),a.$inject=["$http"]}(),function(){"use strict";function a(a,b){function c(){d.baseLayers=[{name:"Open Street Map",layerDef:new ol.layer.Tile({source:new ol.source.OSM({})})},{name:"Camada em Branco",layerDef:new ol.layer.Tile({})}],d.baseLayer="Mapa de Base"}var d=this;c(),d.setBaseLayer=function(a){d.baseLayer=a.name,b.setBaseLayer(a.layerDef)}}angular.module("MapModule").controller("BaseLayerController",a),a.$inject=["$scope","MapService"]}(),function(){"use strict";function a(a){var b=this;a.groups=[],b.expandTree=function(){a.tree.visit(function(a){a.setExpanded(!0)})},b.collapseTree=function(){a.tree.visit(function(a){a.setExpanded(!1)})},b.deselectAll=function(){a.tree.visit(function(a){a.setSelected(!1)})},b.hideMenu=function(){a.$parent.menuIsHidden=!0},b.help=function(){alert(" Em Desenvolvimento... ")}}angular.module("MapModule").controller("TabsController",a),a.$inject=["$scope"]}(),function(){"use strict";function a(a,b,c,d){function e(e,f,g){f.find("#tree").fancytree({extensions:["edit","glyph","wide"],checkbox:!0,glyph:a.glyph_opts,clickFolderMode:4,selectMode:3,source:a.source,toggleEffect:{effect:"drop",options:{direction:"left"},duration:200},wide:{iconWidth:"1em",iconSpacing:"0.5em",levelOfs:"1.5em"},select:function(a,e){d(function(){if(e.node.isFolder()){var a=e.node.children;e.node.isSelected()?a.forEach(function(a){a.data.key=a.key,b.addLayer(a.data),c.addLayerLegend(a)}):a.forEach(function(a){a.data.key=a.key,b.removeLayer(a.data),c.removeLayerLegend(a)})}else e.node.isSelected()?(e.node.data.key=e.node.key,b.addLayer(e.node.data),c.addLayerLegend(e.node)):(e.node.data.key=e.node.key,b.removeLayer(e.node.data),c.removeLayerLegend(e.node))},1)},init:function(a,c){var d=b.map.getView().getZoom();d===parseInt(d,10)&&c.tree.visit(function(a){a.data.preselected&&a.setSelected(!0);var b=a.data.minZoom;a.data.maxZoom;a.isFolder()||void 0!=b&&(b<d?a.removeClass("layer-hidden"):a.addClass("layer-hidden"))})},click:function(a,c){if("icon"===c.targetType&&!c.node.isFolder()){var d=ol.proj.transformExtent(c.node.data.extent,ol.proj.get("EPSG:27493"),"EPSG:3857");b.map.getView().fit(d,{duration:1500})}}});e.tree=f.find("#tree").fancytree("getTree")}var f={bindToController:!0,controller:"TabsController",controllerAs:"tc",link:e,restrict:"E",scope:{menuIsHidden:"="},templateUrl:"app/templates/tabs.html"};return f}angular.module("MapModule").directive("controlPanel",a),a.$inject=["LayersFactory","MapService","LegendsService","$timeout"]}();