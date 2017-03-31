!function(){"use strict";angular.module("pdmApp",["MapModule","LegendsModule","MapInteractionsModule","PrintingModule"])}(),!function(){"use strict";angular.module("DrawingModule",[])}(),function(){"use strict";function a(a,b){function c(a){switch(a){case"Point":k.info="Para desenhar um ponto, faça clique no mapa.";break;case"LineString":k.info="Para desenhar uma linha, vá clicando no mapa. Duplo clique termina a linha.";break;case"Polygon":k.info="Para desenhar um polígono, vá clicando no mapa. Duplo clique fecha o polígono."}}function d(){e=new ol.format.GeoJSON({featureProjection:ol.proj.get("EPSG:27493")}),f=new ol.style.Style({fill:new ol.style.Fill({color:"rgba(174, 0, 0, 0.3)"}),stroke:new ol.style.Stroke({color:"rgba(0,0,0,0.75)",width:2}),image:new ol.style.Circle({radius:5,fill:new ol.style.Fill({color:"rgba(174, 0, 0, 0.3)"}),stroke:new ol.style.Stroke({color:"rgba(0,0,0,0.75)"})})}),g=new ol.style.Style({fill:new ol.style.Fill({color:"rgba(255, 255, 255, 0.3)"}),stroke:new ol.style.Stroke({color:"rgba(174,0,0,0.75)",width:2}),image:new ol.style.Circle({radius:5,fill:new ol.style.Fill({color:"rgba(174,0,0,0.75)"}),stroke:new ol.style.Stroke({color:"rgba(255, 255, 255, 0.3)"})})}),h=new ol.source.Vector({wrapX:!1}),h.on("addfeature",function(){b.userFeatures=e.writeFeatures(i.getSource().getFeatures(),{dataProjection:ol.proj.get("EPSG:27493"),featureProjection:"EPSG:3857"})}),i=new ol.layer.Vector({source:h,style:f}),k.info=m}var e,f,g,h,i,j,k=this,l=b.map,m="Utilize os botões para definir o tipo de desenho desejado.";d(),k.setDrawingMode=function(d){c(d),l.removeInteraction(j),l.removeLayer(i),j=new ol.interaction.Draw({source:h,style:g,type:d}),l.addInteraction(j),j.once("drawend",function(c){c.feature.set("type",c.feature.getGeometry().getType()),b.map.removeInteraction(j),k.info=m,a.$apply()}),l.addLayer(i)},k.clearDraw=function(){l.removeLayer(i),i.getSource().clear()},a.$on("resetPrinting",function(){k.clearDraw()})}angular.module("DrawingModule").controller("DrawingController",a),a.$inject=["$scope","MapService"]}(),!function(){"use strict";angular.module("LegendsModule",[])}(),function(){"use strict";function a(){function a(a,b){return a.findIndex(function(a){return a.title==this.title},b)}function b(a,b){a.splice(b,1)}this.groups=[],this.addLayerLegend=function(b){var c=a(this.groups,b.parent);c>-1?a(this.groups[c].data,b)==-1&&this.groups[c].data.push({title:b.title,workspace:b.data.workspace,name:b.data.name}):(this.groups.push({title:b.parent.title,data:[]}),this.groups[this.groups.length-1].data.push({title:b.title,workspace:b.data.workspace,name:b.data.name}))}.bind(this),this.removeLayerLegend=function(c){var d=a(this.groups,c.parent),e=a(this.groups[d].data,c);b(this.groups[d].data,e),0==this.groups[d].data.length&&b(this.groups,d)}.bind(this)}angular.module("LegendsModule").service("LegendsService",a)}(),function(){"use strict";function a(a,b){a.groups=b.groups}angular.module("LegendsModule").controller("LegendsController",a),a.$inject=["$scope","LegendsService"]}(),!function(){"use strict";angular.module("MapModule",[])}(),function(){"use strict";function a(){function a(a){proj4.defs("EPSG:27493","+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");var b=[-127101.82,-300782.39,160592.41,278542.12],c=ol.proj.get("EPSG:27493");c.setExtent(b),o=angular.extend(n,a),m=new ol.Map({target:o.target,layers:[new ol.layer.Tile({source:new ol.source.OSM({})})],interactions:o.interactions,controls:o.controls,view:new ol.View({center:ol.proj.transform(o.center,"EPSG:4326","EPSG:3857"),zoom:o.zoom,extent:[-928405.1144335504,5033494.2861691285,-777977.0427683234,5078592.132857382],minZoom:11})}),window.map=m,m.getView().on("change:resolution",function(a){var b=a.target.getZoom();b===parseInt(b,10)&&$("#tree").fancytree("getTree").visit(function(a){a.isFolder()||void 0!=a.data.minZoom&&(a.data.minZoom<b?a.removeClass("layer-hidden"):a.addClass("layer-hidden"))})})}function b(a){m.getLayers().setAt(0,a)}function c(a){"WMS"===a.type?e(a):"TileWMS"===a.type?d(a):j(a)}function d(a){if(h(a.key)){var b=new ol.layer.Tile({opacity:a.opacity,source:new ol.source.TileWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:a.workspace+":"+a.name},extent:a.extent}),minResolution:i(a.maxZoom),maxResolution:i(a.minZoom),group:a.group});k[a.key]=b,m.getLayers().insertLayer(b),k[a.key].visible=!0}else k[a.key].visible||(m.getLayers().insertLayer(k[a.key]),k[a.key].visible=!0)}function e(a){if(h(a.key)){var b=new ol.layer.Image({opacity:a.opacity,source:new ol.source.ImageWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:a.workspace+":"+a.name},extent:a.extent}),minResolution:i(a.maxZoom),maxResolution:i(a.minZoom),group:a.group});k[a.key]=b,m.getLayers().insertLayer(b),k[a.key].visible=!0}else k[a.key].visible||(m.getLayers().insertLayer(k[a.key]),k[a.key].visible=!0)}function f(a){k[a.key]&&(m.removeLayer(k[a.key]),k[a.key].visible=!1)}function g(){m.setView(new ol.View({center:ol.proj.transform(o.center,"EPSG:4326","EPSG:3857"),zoom:o.zoom,extent:[-928405.1144335504,5033494.2861691285,-777977.0427683234,5078592.132857382],minZoom:11}))}function h(a){return!k.hasOwnProperty(a)}function i(a){return"undefined"==typeof a?a:Math.floor(156543.04/Math.pow(2,a))}function j(a){if(h(a.key)){var b=new ol.layer.Vector({source:new ol.source.Vector({loader:function(c){$.ajax("http://gistree.espigueiro.pt/geoserver/wfs",{type:"GET",data:{service:"WFS",version:"1.1.1",request:"GetFeature",typename:a.workspace+":"+a.name,srsname:"EPSG:27493",outputFormat:"application/json",bbox:ol.proj.transformExtent(c,"EPSG:3857",ol.proj.get("EPSG:27493")).join(",")+","+ol.proj.get("EPSG:27493").getCode()},crossDomain:!0}).done(function(a){b.getSource().addFeatures((new ol.format.GeoJSON).readFeatures(a,{featureProjection:"EPSG:3857",dataProjection:ol.proj.get("EPSG:27493")}))})},strategy:ol.loadingstrategy.bbox})});k[a.key]=b,a.style&&(b.setStyle(new ol.style.Style(a.style)),b.setOpacity(a.opacity)),m.addLayer(b),k[a.key].visible=!0}else k[a.key].visible||(m.addLayer(k[a.key]),k[a.key].visible=!0)}var k={},l={};if(!ol)return{};var m={},n={zoom:11,target:"map",center:[-7.7464,41.2951],interactions:[new ol.interaction.MouseWheelZoom,new ol.interaction.DragPan],controls:[new ol.control.ScaleLine,new ol.control.OverviewMap({className:"ol-overviewmap ol-custom-overviewmap",layers:[new ol.layer.Image({source:new ol.source.ImageWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:"cmvrpostgis:limite_freguesias"},extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004]})}),new ol.layer.Image({source:new ol.source.ImageWMS({url:"http://gistree.espigueiro.pt/geoserver/wms",params:{LAYERS:"cmvrpostgis:limite_concelho"},extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004]})})],collapsed:!1})]},o={};angular.equals(m,{})&&a();var p={map:m,init:a,addLayer:c,removeLayer:f,setDefaultView:g,userFeatures:l,setBaseLayer:b};return ol.Collection.prototype.insertLayer=function(a){var b=this.getArray().findIndex(function(b){return b.get("group")<a.get("group")});b!==-1?this.insertAt(b,a):this.push(a)},p}angular.module("MapModule").factory("MapService",a)}(),function(){"use strict";function a(){function a(a){var b=0;return a.forEach(function(a){b++,a.children.forEach(function(a){a.data.group=b})}),a}var b=[{title:"Condicionantes",folder:!0,expanded:!1,children:[{title:"Reserva Agrícola Nacional",data:{workspace:"cmvrpostgis",name:"reserva_agricola_nacional",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Reserva Ecológica Nacional",data:{workspace:"cmvrpostgis",name:"reserva_ecologica_nacional",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Zonas Inundáveis",data:{workspace:"cmvrpostgis",name:"zonas_inundaveis",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Pedreiras",data:{workspace:"cmvrpostgis",name:"pedreiras",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Limite da Rede Natura",data:{workspace:"cmvrpostgis",name:"limite_da_rede_natura_2000",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Aeródromo",data:{workspace:"cmvrpostgis",name:"aerodromo",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Linhas de Alta Tensão",data:{workspace:"cmvrpostgis",name:"linhas_de_alta_tensao",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Abastecimento de Águas Adutoras",data:{workspace:"cmvrpostgis",name:"abastecimento_de_aguas_adutoras",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Rede Rodoviária",data:{workspace:"cmvrpostgis",name:"rede_rodoviaria",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Rede Rodoviária Prevista",data:{workspace:"cmvrpostgis",name:"rede_rodoviaria_prevista",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Rede Ferroviária",data:{workspace:"cmvrpostgis",name:"rede_ferroviaria",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Vértices Geodésicos",data:{workspace:"cmvrpostgis",name:"vertices_geodesicos",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}}]},{title:"Ordenamento",folder:!0,expanded:!1,children:[{title:"Solo Rural",data:{workspace:"cmvrpostgis",name:"solo_rural",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Solo Urbano",data:{workspace:"cmvrpostgis",name:"solo_urbano",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Solo Urbanização Programada",data:{workspace:"cmvrpostgis",name:"solo_de_urbanizacao_programada",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Estrutura Ecológica Urbana",data:{workspace:"cmvrpostgis",name:"estrutura_ecologica_urbana",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Outras Instalações",data:{workspace:"cmvrpostgis",name:"outras_instalacoes",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Zonas de Proteção ao Aeródromo",data:{workspace:"cmvrpostgis",name:"zonas_de_protecao_ao_aerodromo",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}}]},{title:"Enquadramento",folder:!0,expanded:!0,children:[{title:"Edifícios",preselected:!0,data:{workspace:"cmvrpostgis",name:"edificios",type:"TileWMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1,minZoom:17}},{title:"Limite Freguesias",preselected:!0,data:{workspace:"cmvrpostgis",name:"limite_freguesias",type:"WMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}},{title:"Limite Concelho",preselected:!0,data:{workspace:"cmvrpostgis",name:"limite_concelho",type:"WMS",extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004],opacity:1}}]}];return{glyph_opts:{map:{checkbox:"fa fa-toggle-off",checkboxSelected:"fa fa-toggle-on",checkboxUnknown:"fa fa-circle",error:"fa fa-exclamation-triangle",expanderClosed:"fa  fa-arrow-right",expanderLazy:"fa fa-arrow-right",expanderOpen:"fa fa-arrow-down",folder:"fa fa-folder",folderOpen:"fa fa-folder-open",loading:"fa fa-spinner"}},source:a(b)}}angular.module("MapModule").factory("LayersFactory",a)}(),function(){"use strict";function a(a,b){function c(){d.baseLayers=[{name:"Open Street Map",layerDef:new ol.layer.Tile({source:new ol.source.OSM({})})},{name:"Camada em Branco",layerDef:new ol.layer.Tile({})}],d.baseLayer="Mapa de Base"}var d=this;c(),d.setBaseLayer=function(a){console.log("Click"),d.baseLayer=a.name,b.setBaseLayer(a.layerDef)}}angular.module("MapModule").controller("BaseLayerController",a),a.$inject=["$scope","MapService"]}(),function(){"use strict";function a(a){var b=this;a.groups=[],b.expandTree=function(){a.tree.visit(function(a){a.setExpanded(!0)})},b.collapseTree=function(){a.tree.visit(function(a){a.setExpanded(!1)})},b.deselectAll=function(){a.tree.visit(function(a){a.setSelected(!1)})},b.hideMenu=function(){a.$parent.menuIsHidden=!0},b.help=function(){alert(" Em Desenvolvimento... ")}}angular.module("MapModule").controller("TabsController",a),a.$inject=["$scope"]}(),function(){"use strict";function a(a,b,c,d){function e(e,f,g){f.find("#tree").fancytree({extensions:["edit","glyph","wide"],checkbox:!0,glyph:a.glyph_opts,clickFolderMode:4,selectMode:3,source:a.source,toggleEffect:{effect:"drop",options:{direction:"left"},duration:200},wide:{iconWidth:"1em",iconSpacing:"0.5em",levelOfs:"1.5em"},select:function(a,e){d(function(){if(e.node.isFolder()){var a=e.node.children;e.node.isSelected()?a.forEach(function(a){a.data.key=a.key,b.addLayer(a.data),c.addLayerLegend(a)}):a.forEach(function(a){a.data.key=a.key,b.removeLayer(a.data),c.removeLayerLegend(a)})}else e.node.isSelected()?(e.node.data.key=e.node.key,b.addLayer(e.node.data),c.addLayerLegend(e.node)):(e.node.data.key=e.node.key,b.removeLayer(e.node.data),c.removeLayerLegend(e.node))},1)},init:function(a,c){var d=b.map.getView().getZoom();d===parseInt(d,10)&&c.tree.visit(function(a){a.data.preselected&&a.setSelected(!0);var b=a.data.minZoom;a.data.maxZoom,a.isFolder()||void 0!=b&&(b<d?a.removeClass("layer-hidden"):a.addClass("layer-hidden"))})}}),e.tree=f.find("#tree").fancytree("getTree")}var f={bindToController:!0,controller:"TabsController",controllerAs:"tc",link:e,restrict:"E",scope:{menuIsHidden:"="},templateUrl:"app/templates/tabs.html"};return f}angular.module("MapModule").directive("controlPanel",a),a.$inject=["LayersFactory","MapService","LegendsService","$timeout"]}(),!function(){"use strict";angular.module("MapInteractionsModule",[])}(),function(){"use strict";function a(a,b,c){this.active="DragPan",this.isActive=function(a){return this.active==a},this.currentInteraction="Mover Mapa",this.setDefaultView=function(a){c.setDefaultView()},this.setInteraction=function(a){switch(c.map.getInteractions().pop(),a){case"DragPan":this.currentInteraction="Mover Mapa",c.map.addInteraction(new ol.interaction.DragPan);break;case"ZoomIn":this.currentInteraction="Aproximar Mapa",c.map.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(a){var b=c.map.getView();b.setCenter(a.coordinate),b.setZoom(b.getZoom()+1)}}));break;case"ZoomOut":this.currentInteraction="Afastar Mapa",c.map.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(a){var b=c.map.getView();b.setCenter(a.coordinate),b.setZoom(b.getZoom()-1)}}));break;case"ZoomBox":this.currentInteraction="Fazer Zoom de Caixa",c.map.addInteraction(new ol.interaction.DragZoom({condition:ol.events.condition.always,className:"drag_zoom_box"}))}this.active=a},this.showMenu=function(){this.menuIsHidden=!1},a.$watch("itCtrl.menuIsHidden",function(){b(function(){c.map.updateSize()},10)})}angular.module("MapInteractionsModule").controller("MapInteractionsController",a),a.$inject=["$scope","$timeout","MapService"]}(),function(){"use strict";function a(a){function b(b,c,d){a.map.addControl(new ol.control.MousePosition({coordinateFormat:function(a){return ol.coordinate.format(a," {x} , {y} ",4)},projection:"EPSG:4326",className:"",target:document.getElementById("coordinate4326"),undefinedHTML:"&nbsp;"})),a.map.addControl(new ol.control.MousePosition({coordinateFormat:function(a){return ol.coordinate.format(a," {x} , {y} ",4)},projection:ol.proj.get("EPSG:27493"),className:"",target:document.getElementById("coordinate27493"),undefinedHTML:"&nbsp;"}))}var c={bindToController:!0,controller:"MapInteractionsController",controllerAs:"itCtrl",link:b,restrict:"E",scope:{menuIsHidden:"="},templateUrl:"app/templates/MapInteractionsTemplate.html"};return c}angular.module("MapInteractionsModule").directive("mapInteractions",a),a.$inject=["MapService"]}(),!function(){"use strict";angular.module("PrintingModule",["DrawingModule"])}(),function(){"use strict";function a(a){var b={"Planta de Ordenamento":[{type:"WMS",format:"image/png",layers:["cmvrpostgis:solo_rural","cmvrpostgis:solo_urbano","cmvrpostgis:solo_de_urbanizacao_programada","cmvrpostgis:estrutura_ecologica_urbana","cmvrpostgis:outras_instalacoes","cmvrpostgis:zonas_de_protecao_ao_aerodromo"],baseURL:"http://gistree.espigueiro.pt/geoserver/wms",customParams:{}}],"Planta de Condicionantes":[{type:"WMS",format:"image/png",layers:["cmvrpostgis:reserva_agricola_nacional","cmvrpostgis:reserva_ecologica_nacional","cmvrpostgis:zonas_inundaveis","cmvrpostgis:pedreiras","cmvrpostgis:limite_da_rede_natura_2000","cmvrpostgis:aerodromo","cmvrpostgis:linhas_de_alta_tensao","cmvrpostgis:abastecimento_de_aguas_adutoras","cmvrpostgis:rede_rodoviaria","cmvrpostgis:rede_rodoviaria_prevista","cmvrpostgis:rede_ferroviaria","cmvrpostgis:vertices_geodesicos"],baseURL:"http://gistree.espigueiro.pt/geoserver/wms",customParams:{}}]},c=[],d={};this.addNewResult=function(a){c.push(a)},this.getPrintResults=function(){return c},this.resetPrintResults=function(){c.splice(0,c.length)},this.setDetails=function(a){d=a},this.getDetails=function(){return d},this.getPrintSpec=function(c,e){var f={layout:"pdmLayout",srs:"EPSG:27493",units:"m",outputFormat:"pdf",mapTitle:c,type:e,layers:[],pages:[{center:ol.proj.transform(a.map.getView().getCenter(),"EPSG:3857",ol.proj.get("EPSG:27493")),scale:1e4,dpi:300}]};return f.outputFilename=c.split(" ").join("_"),f.pages[0].MapTitle=c,angular.copy(b[c],f.layers),angular.equals(a.userFeatures,{})||f.layers.push({type:"Vector",styles:{"":{strokeColor:"#000000",strokeWidth:"2",fillColor:"#ae0000",fillOpacity:.7}},opacity:"0.8",geoJson:JSON.parse(a.userFeatures)}),angular.extend(f.pages[0],d),f}}angular.module("PrintingModule").service("PrintDetailsService",a),a.$inject=["MapService"]}(),function(){"use strict";function a(a,b){function c(){d.userData={requerente:"",proprietario:"",nif:"",freguesia:"",local:""},b.setDetails(d.userData)}var d=this;c(),a.$on("resetPrinting",function(){c()})}angular.module("PrintingModule").controller("FormController",a),a.$inject=["$scope","PrintDetailsService"]}(),function(){"use strict";function a(a,b,c,d){function e(){f.layouts=[{selected:!1,name:"Planta de Ordenamento",layout:"pdmLayout",title:"Planta de Ordenamento",escala:1e4,type:"ordenamento",tamanho:"A3"},{selected:!1,name:"Planta de Condicionantes",layout:"pdmLayout",title:"Planta de Condicionantes",type:"condicionantes",escala:1e4,tamanho:"A3"}],f.noSelect=!0}var f=this;e(),this.change=function(){f.noSelect=!f.layouts.some(function(a){return a.selected===!0})},this.printLayouts=function(){var a=[];f.layouts.forEach(function(d){d.selected&&a.push(c.post("http://gistree.espigueiro.pt:80/geoserver/pdf/create.json",b.getPrintSpec(d.name,d.type)))}),d.all(a).then(function(a){a.forEach(function(a){b.addNewResult({title:a.config.data.mapTitle,url:a.data.getURL})})})},a.$on("resetPrinting",function(){e()})}angular.module("PrintingModule").controller("LayoutSelectionController",a),a.$inject=["$scope","PrintDetailsService","$http","$q"]}(),function(){"use strict";function a(a){function b(){c.active=1}var c=this;b(),this.activeTab=function(a){return a==c.active},this.nextPage=function(a){a&&c.active++},a.$on("resetPrinting",function(){c.active=1})}angular.module("PrintingModule").controller("PagesController",a),a.$inject=["$scope"]}(),function(){"use strict";function a(a,b){function c(){d.printResults=b.getPrintResults(),d.message1="A processar o seu pedido.",d.message2="Por favor aguarde..."}var d=this;c(),this.newPrint=function(){a.$parent.$broadcast("resetPrinting"),b.resetPrintResults()}}angular.module("PrintingModule").controller("PrintResultController",a),a.$inject=["$scope","PrintDetailsService"]}();