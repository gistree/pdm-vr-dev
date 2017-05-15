!function(){"use strict";angular.module("pdmApp",["MapModule","LegendsModule","MapInteractionsModule","PrintingModule","SearchLocationModule","BaseDocumentalModule","AuthenticationModule","ngDialog"])}(),!function(){"use strict";angular.module("AuthenticationModule",[])}(),function(){"use strict";function a(a){function b(b,c){return a({url:"/credentials/login",method:"POST",data:{username:b,password:c},xhrFields:{withCredentials:!0}})}function c(){return a({url:"/credentials/logout",method:"POST"})}function d(a){h=a,i=!0}function e(){h="",i=!1}function f(){return i}function g(){return h}var h="",i=!1;this.login=b,this.logout=c,this.loginUser=d,this.logoutUser=e,this.isUserLogged=f,this.getUsername=g}angular.module("AuthenticationModule").service("CredentialsService",a),a.$inject=["$http"]}(),function(){"use strict";function a(a,b,c){var d=this;this.submit=function(e){a.submitted=!0,e.$invalid||c.login(d.username,d.password).then(function(d){d.data.layers.forEach(function(a){b.addLayer(a)}),c.loginUser(d.data.username),a.closeThisDialog()},function(a){d.invalidUser=!0,d.invalidPass=!0,d.message="O login falhou."})},this.reset=function(a){d[a]=!1}}angular.module("AuthenticationModule").controller("DialogController",a),a.$inject=["$scope","LayersFactory","CredentialsService"]}(),function(){"use strict";function a(a,b,c,d){function e(){f.isLogged=c.isUserLogged(),f.username=c.getUsername(),window.ctrl=f}var f=this;this.login=function(){a.open({template:"app/templates/login.html",className:"ngdialog-theme-default",showClose:!1,controller:"DialogController",controllerAs:"dialogCtrl"})},this.logout=function(){c.logout().then(function(a){d.removeProtectedLayers(),c.logoutUser()},function(a){d.removeProtectedLayers(),c.logoutUser()})},b.$watch(function(){return c.isUserLogged()},function(a){f.isLogged=c.isUserLogged(),f.username=c.getUsername()}),e()}angular.module("AuthenticationModule").controller("LoginController",a),a.$inject=["ngDialog","$scope","CredentialsService","LayersFactory"]}(),!function(){"use strict";angular.module("BaseDocumentalModule",[])}(),function(){"use strict";function a(){function a(){return"http://www.cm-vilareal.pt/images/cidadao/urbanismo/PDM/"}function b(){return[{categoria:"Plantas de Condicionantes",content:[{subcategoria:"Áreas Florestais Percorridas por Incêndio",content:[{name:"PLANTA-A",address:"ordenamento/areas_florestais_percorridas_incendio_planta_a.pdf"},{name:"PLANTA-B",address:"ordenamento/acustico_dia_planta_b.pdf"}],img:"app/img/a-b.png"},{subcategoria:"Perigosidade de Incêndio",content:[{name:"PLANTA-A",address:"ordenamento/risco_incendio_planta_a.pdf"},{name:"PLANTA-B",address:"ordenamento/risco_incendio_planta_b.pdf"}],img:"app/img/a-b.png"},{subcategoria:"Planta de Condicionantes",content:[{name:"PLANTA-A",address:"ordenamento/condicionantes_planta_a.pdf"},{name:"PLANTA-B",address:"ordenamento/condicionantes_planta_b.pdf"},{name:"PLANTA-C",address:"ordenamento/condicionantes_planta_c.pdf"},{name:"PLANTA-D",address:"ordenamento/condicionantes_planta_d.pdf"},{name:"PLANTA-E",address:"ordenamento/condicionantes_planta_e.pdf"},{name:"PLANTA-F",address:"ordenamento/condicionantes_planta_f.pdf"},{name:"PLANTA-G",address:"ordenamento/condicionantes_planta_g.pdf"}],img:"app/img/a-g.png"}]},{categoria:"Plantas de Ordenamento",content:[{subcategoria:"Qualificação do Solo",content:[{name:"PLANTA-A",address:"ordenamento/solo_planta_a.pdf"},{name:"PLANTA-B",address:"ordenamento/solo_planta_b.pdf"},{name:"PLANTA-C",address:"ordenamento/solo_planta_c.pdf"},{name:"PLANTA-D",address:"ordenamento/solo_planta_d.pdf"},{name:"PLANTA-E",address:"ordenamento/solo_planta_e.pdf"},{name:"PLANTA-F",address:"ordenamento/solo_planta_f.pdf"},{name:"PLANTA-G",address:"ordenamento/solo_planta_g.pdf"}],img:"app/img/a-g.png"},{subcategoria:"Zonamento Acústico",content:[{name:"Dia | PLANTA-A",address:"ordenamento/acustico_dia_planta_a.pdf"},{name:"Dia | PLANTA-B",address:"ordenamento/acustico_dia_planta_b.pdf"},{name:"Noite | PLANTA-A",address:"ordenamento/acustico_noite_planta_a.pdf"},{name:"Noite | PLANTA-B",address:"ordenamento/acustico_noite_planta_a.pdf"}],img:"app/img/a-b.png"}]},{categoria:"Regulamento",content:[{subcategoria:"Regulamento",content:[{name:"Regulamento do Plano Diretor Municipal (Aviso n.º 7317 de 2011)",address:"ordenamento/aviso7317_2011_PDMVR.pdf"}]}]},{categoria:"Correcções Materiais",content:[{subcategoria:"Correcções Materiais",content:[{name:"Correção material do Plano Diretor Municipal de Vila Real - DR n.º 178/2013",address:"dr_178_2013.pdf"},{name:"Correção material do Plano Diretor Municipal de Vila Real - DR n.º 29/2014",address:"dr_29_2014.pdf"},{name:"Correção material do Plano Diretor Municipal de Vila Real - DR n.º 202/2014",address:"dr_229_2014.pdf"}]}]},{categoria:"Relatório de Discussão Pública",content:[{subcategoria:"Relatório de Discussão Pública",content:[{name:"Relatório de Discussão Pública",address:"relat_discussao_publica_pdm.pdf"}]}]}]}this.getData=b,this.getBaseAddress=a}angular.module("BaseDocumentalModule").service("BaseDocumentalService",a)}(),function(){"use strict";function a(){var a={bindToController:!0,controller:b,controllerAs:"catCtrl",restrict:"E",scope:{},templateUrl:"app/templates/category.html"};return a}function b(a){function b(){c.isActive=!1,c.baseAddress=a.getBaseAddress(),c.items=a.getData()}var c=this;b(),c.setActive=function(a){c.active==a?c.isActive=!c.isActive:c.isActive=!0,c.active=a,c.subIndex=-1}}angular.module("BaseDocumentalModule").directive("categoryList",a),b.$inject=["BaseDocumentalService"]}(),function(){"use strict";function a(){var a={bindToController:!0,controller:b,controllerAs:"subCatCtrl",restrict:"E",scope:{subcategory:"=",baseAddress:"=",active:"=index"},templateUrl:"app/templates/subcategory.html"};return a}function b(){var a=this;a.setActive=function(b){a.active=b}}angular.module("BaseDocumentalModule").directive("subcategoryList",a)}(),!function(){"use strict";angular.module("DrawingModule",[])}(),function(){"use strict";function a(a,b,c){function d(a){switch(a){case"Point":l.info="Para desenhar um ponto, faça clique no mapa.";break;case"LineString":l.info="Para desenhar uma linha, vá clicando no mapa. Duplo clique termina a linha.";break;case"Polygon":l.info="Para desenhar um polígono, vá clicando no mapa. Duplo clique fecha o polígono."}}function e(){f=new ol.format.GeoJSON({featureProjection:ol.proj.get("EPSG:27493")}),g=new ol.style.Style({fill:new ol.style.Fill({color:"rgba(174, 0, 0, 0.3)"}),stroke:new ol.style.Stroke({color:"rgba(0,0,0,0.75)",width:2}),image:new ol.style.Circle({radius:5,fill:new ol.style.Fill({color:"rgba(174, 0, 0, 0.3)"}),stroke:new ol.style.Stroke({color:"rgba(0,0,0,0.75)"})})}),h=new ol.style.Style({fill:new ol.style.Fill({color:"rgba(255, 255, 255, 0.3)"}),stroke:new ol.style.Stroke({color:"rgba(174,0,0,0.75)",width:2}),image:new ol.style.Circle({radius:5,fill:new ol.style.Fill({color:"rgba(174,0,0,0.75)"}),stroke:new ol.style.Stroke({color:"rgba(255, 255, 255, 0.3)"})})}),i=new ol.source.Vector({wrapX:!1}),i.on("addfeature",function(){b.userFeatures=f.writeFeatures(j.getSource().getFeatures(),{dataProjection:ol.proj.get("EPSG:27493"),featureProjection:"EPSG:3857"})}),j=new ol.layer.Vector({source:i,style:g}),l.info=o}var f,g,h,i,j,k,l=this,m=b.map,n=c,o="Utilize os botões para definir o tipo de desenho desejado.";e(),l.setDrawingMode=function(c){n.setMapInteraction("DragPan"),d(c),m.removeInteraction(k),m.removeLayer(j),k=new ol.interaction.Draw({source:i,style:h,type:c}),m.addInteraction(k),k.once("drawend",function(c){c.feature.set("type",c.feature.getGeometry().getType()),b.map.removeInteraction(k),l.info=o,a.$apply()}),m.addLayer(j)},l.clearDraw=function(){m.removeLayer(j),j.getSource().clear()},a.$on("resetPrinting",function(){l.clearDraw()})}angular.module("DrawingModule").controller("DrawingController",a),a.$inject=["$scope","MapService","MapInteractionsService"]}(),!function(){"use strict";angular.module("LegendsModule",[])}(),function(){"use strict";function a(){function a(a,b){return a.findIndex(function(a){return a.title==this.title},b)}function b(a,b){a.splice(b,1)}this.groups=[],this.addLayerLegend=function(b){var c=a(this.groups,b.parent);c>-1?a(this.groups[c].data,b)==-1&&this.groups[c].data.push({title:b.title,workspace:b.data.workspace,name:b.data.name}):(this.groups.push({title:b.parent.title,data:[]}),this.groups[this.groups.length-1].data.push({title:b.title,workspace:b.data.workspace,name:b.data.name}))}.bind(this),this.removeLayerLegend=function(c){var d=a(this.groups,c.parent),e=a(this.groups[d].data,c);b(this.groups[d].data,e),0==this.groups[d].data.length&&b(this.groups,d)}.bind(this)}angular.module("LegendsModule").service("LegendsService",a)}(),function(){"use strict";function a(a,b){a.groups=b.groups}angular.module("LegendsModule").controller("LegendsController",a),a.$inject=["$scope","LegendsService"]}(),!function(){"use strict";angular.module("MapModule",[])}(),function(){"use strict";function a(a){function b(a){proj4.defs("EPSG:27493","+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");var b=[-127101.82,-300782.39,160592.41,278542.12],c=ol.proj.get("EPSG:27493");c.setExtent(b),q=angular.extend(p,a),o=new ol.Map({target:q.target,layers:[new ol.layer.Tile({source:new ol.source.OSM({}),queryable:!1})],interactions:q.interactions,controls:q.controls,view:new ol.View({center:ol.proj.transform(q.center,"EPSG:4326","EPSG:3857"),zoom:q.zoom,extent:[-928405.1144335504,5033494.2861691285,-777977.0427683234,5078592.132857382],minZoom:11})}),o.getView().on("change:resolution",function(a){var b=a.target.getZoom();b===parseInt(b,10)&&$("#tree").fancytree("getTree").visit(function(a){a.isFolder()||void 0!=a.data.minZoom&&(a.data.minZoom<b?a.removeClass("layer-hidden"):a.addClass("layer-hidden"))})})}function c(a){o.getLayers().setAt(0,a)}function d(a){"WMS"===a.type?f(a):"TileWMS"===a.type?e(a):l(a)}function e(a){if(j(a.key)){var b=new ol.layer.Tile({opacity:a.opacity,source:new ol.source.TileWMS({url:"https://gistree.espigueiro.pt:3001/wms",params:{LAYERS:a.workspace+":"+a.name},extent:a.extent}),minResolution:k(a.maxZoom),maxResolution:k(a.minZoom),group:a.group,queryable:a.queryable});m[a.key]=b,o.getLayers().insertLayer(b),m[a.key].visible=!0}else m[a.key].visible||(o.getLayers().insertLayer(m[a.key]),m[a.key].visible=!0)}function f(a){if(j(a.key)){var b=new ol.layer.Image({opacity:a.opacity,source:new ol.source.ImageWMS({url:"https://gistree.espigueiro.pt:3001/wms",params:{LAYERS:a.workspace+":"+a.name},extent:a.extent}),minResolution:k(a.maxZoom),maxResolution:k(a.minZoom),group:a.group,queryable:a.queryable});m[a.key]=b,o.getLayers().insertLayer(b),m[a.key].visible=!0}else m[a.key].visible||(o.getLayers().insertLayer(m[a.key]),m[a.key].visible=!0)}function g(a){m[a.key]&&(o.removeLayer(m[a.key]),m[a.key].visible=!1)}function h(){o.setView(new ol.View({center:ol.proj.transform(q.center,"EPSG:4326","EPSG:3857"),zoom:q.zoom,extent:[-928405.1144335504,5033494.2861691285,-777977.0427683234,5078592.132857382],minZoom:11}))}function i(a,b){var c=o.getView();window.view=c,o.getView().animate({zoom:11,duration:500},{center:ol.proj.transform(a,ol.proj.get(b),"EPSG:3857"),duration:1500,zoom:15})}function j(a){return!m.hasOwnProperty(a)}function k(a){return"undefined"==typeof a?a:Math.floor(156543.04/Math.pow(2,a))}function l(a){if(j(a.key)){var b=new ol.layer.Vector({source:new ol.source.Vector({loader:function(c){$.ajax("http://gistree.espigueiro.pt/geoserver/wfs",{type:"GET",data:{service:"WFS",version:"1.1.1",request:"GetFeature",typename:a.workspace+":"+a.name,srsname:"EPSG:27493",outputFormat:"application/json",bbox:ol.proj.transformExtent(c,"EPSG:3857",ol.proj.get("EPSG:27493")).join(",")+","+ol.proj.get("EPSG:27493").getCode()},crossDomain:!0}).done(function(a){b.getSource().addFeatures((new ol.format.GeoJSON).readFeatures(a,{featureProjection:"EPSG:3857",dataProjection:ol.proj.get("EPSG:27493")}))})},strategy:ol.loadingstrategy.bbox})});m[a.key]=b,a.style&&(b.setStyle(new ol.style.Style(a.style)),b.setOpacity(a.opacity)),o.addLayer(b),m[a.key].visible=!0}else m[a.key].visible||(o.addLayer(m[a.key]),m[a.key].visible=!0)}var m={},n={};if(!ol)return{};var o={},p={zoom:11,target:"map",center:[-7.7464,41.2951],interactions:[new ol.interaction.MouseWheelZoom,new ol.interaction.DragPan],controls:[new ol.control.ScaleLine,new ol.control.OverviewMap({className:"ol-overviewmap ol-custom-overviewmap",layers:[new ol.layer.Image({source:new ol.source.ImageWMS({url:"https://gistree.espigueiro.pt:3001/wms",params:{LAYERS:"cmvrpostgis:limite_freguesias"},extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004]})}),new ol.layer.Image({source:new ol.source.ImageWMS({url:"https://gistree.espigueiro.pt:3001/wms",params:{LAYERS:"cmvrpostgis:limite_concelho"},extent:[-127028.95781617332,-301620.79631591577,173162.9865501142,278637.28586892004]})})],collapseLabel:"-",label:"+",collapsed:!1,tipLabel:""})]},q={};angular.equals(o,{})&&b();var r={map:o,init:b,addLayer:d,removeLayer:g,setDefaultView:h,userFeatures:n,setBaseLayer:c,zoomToCoordinate:i};return r}angular.module("MapModule").factory("MapService",a),a.$inject=["$http"],ol.Collection.prototype.insertLayer=function(a){var b=this.getArray().findIndex(function(b){return b.get("group")<a.get("group")});b!==-1?this.insertAt(b,a):this.push(a)},ol.layer.Base.prototype.isQueryable=function(){return this.get("queryable")}}(),function(){"use strict";function a(){function a(a){$("#tree").fancytree("getTree").visit(function(b){b.isFolder()&&b.title==a.title&&a.children.forEach(function(a){a.extraClasses="protected",b.addChildren(a,0)})})}function b(){var a=[];$("#tree").fancytree("getTree").visit(function(b){!b.isFolder()&&b.data.protected&&a.push(b.key)});for(var b=0;b<a.length;b++){var c=$("#tree").fancytree("getTree").getNodeByKey(a[b]);c.remove()}}return{glyph_opts:{map:{checkbox:"fa fa-toggle-off",checkboxSelected:"fa fa-toggle-on",checkboxUnknown:"fa fa-circle",doc:"fa fa-search",docOpen:"fa fa-search",error:"fa fa-exclamation-triangle",expanderClosed:"fa  fa-arrow-right",expanderLazy:"fa fa-arrow-right",expanderOpen:"fa fa-arrow-down",folder:"fa fa-folder",folderOpen:"fa fa-folder-open",loading:"fa fa-spinner"}},addLayer:a,removeProtectedLayers:b}}angular.module("MapModule").factory("LayersFactory",a)}(),function(){"use strict";function a(a){function b(b){a({method:"GET",url:"/api/freguesias"}).then(function(a){b(a.data)},function(a){console.error(a)})}function c(b){a({method:"GET",url:"/api/localidades"}).then(function(a){b(a.data)},function(a){console.error(a)})}var d={getFreguesias:b,getLocalidades:c};return d}angular.module("MapModule").factory("LocationsFactory",a),a.$inject=["$http"]}(),function(){"use strict";function a(a,b){function c(){d.baseLayers=[{name:"Open Street Map",layerDef:new ol.layer.Tile({source:new ol.source.OSM({})})},{name:"Camada em Branco",layerDef:new ol.layer.Tile({})}],d.baseLayer="Mapa de Base"}var d=this;c(),d.setBaseLayer=function(a){d.baseLayer=a.name,b.setBaseLayer(a.layerDef)}}angular.module("MapModule").controller("BaseLayerController",a),a.$inject=["$scope","MapService"]}(),function(){"use strict";function a(a){var b=this;a.groups=[],b.expandTree=function(){a.tree.visit(function(a){a.setExpanded(!0)})},b.collapseTree=function(){a.tree.visit(function(a){a.setExpanded(!1)})},b.deselectAll=function(){a.tree.visit(function(a){a.setSelected(!1)})},b.hideMenu=function(){a.$parent.menuIsHidden=!0},b.help=function(){alert(" Em Desenvolvimento... ")}}angular.module("MapModule").controller("TabsController",a),a.$inject=["$scope"]}(),function(){"use strict";function a(a,b,c,d){function e(e,f,g){f.find("#tree").fancytree({extensions:["edit","glyph","wide"],checkbox:!0,glyph:a.glyph_opts,clickFolderMode:4,selectMode:3,source:{url:"/api/layers"},toggleEffect:{effect:"drop",options:{direction:"left"},duration:200},wide:{iconWidth:"1em",iconSpacing:"0.5em",levelOfs:"1.5em"},select:function(a,e){d(function(){if(e.node.isFolder()){var a=e.node.children;e.node.isSelected()?a.forEach(function(a){a.data.key=a.key,b.addLayer(a.data),c.addLayerLegend(a)}):a.forEach(function(a){a.data.key=a.key,b.removeLayer(a.data),c.removeLayerLegend(a)})}else e.node.isSelected()?(e.node.data.key=e.node.key,b.addLayer(e.node.data),c.addLayerLegend(e.node)):(e.node.data.key=e.node.key,b.removeLayer(e.node.data),c.removeLayerLegend(e.node))},1)},init:function(a,c){var d=b.map.getView().getZoom();d===parseInt(d,10)&&c.tree.visit(function(a){a.data.preselected&&a.setSelected(!0);var b=a.data.minZoom;a.data.maxZoom,a.isFolder()||void 0!=b&&(b<d?a.removeClass("layer-hidden"):a.addClass("layer-hidden"))})},click:function(a,c){if("icon"===c.targetType&&!c.node.isFolder()){var d=ol.proj.transformExtent(c.node.data.extent,ol.proj.get("EPSG:27493"),"EPSG:3857");b.map.getView().fit(d,{duration:1500})}}}),e.tree=f.find("#tree").fancytree("getTree")}var f={bindToController:!0,controller:"TabsController",controllerAs:"tc",link:e,restrict:"E",scope:{menuIsHidden:"="},templateUrl:"app/templates/tabs.html"};return f}angular.module("MapModule").directive("controlPanel",a),a.$inject=["LayersFactory","MapService","LegendsService","$timeout"]}(),!function(){"use strict";angular.module("MapInteractionsModule",[])}(),function(){"use strict";function a(a){function b(b,c,f){f.forEach(function(f){if(f.isQueryable()){var g=f.getSource().getGetFeatureInfoUrl(ol.proj.transform(b.coordinate,"EPSG:3857",ol.proj.get("EPSG:27493")),c.getResolution(),ol.proj.get("EPSG:27493"),{INFO_FORMAT:"application/json"});g&&(d(),new ol.format.GeoJSON,a({url:g}).then(function(a){a.data.features.length>0&&e.push(a.data)}))}})}function c(){return e}function d(){e.length=0}var e=[];this.getResults=c,this.getLayersInfo=b,this.clearResults=d}angular.module("MapInteractionsModule").service("LayerQueryResultsService",a),a.$inject=["$http"]}(),function(){"use strict";function a(a,b,c){var d={interaction:"",interactionText:""};this.setMapInteraction=function(c){switch(a.map.getInteractions().pop(),c){case"DragPan":d.interactionText="Mover Mapa",a.map.addInteraction(new ol.interaction.DragPan);break;case"ZoomIn":d.interactionText="Aproximar Mapa",a.map.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(b){var c=a.map.getView();c.setCenter(b.coordinate),c.setZoom(c.getZoom()+1)}}));break;case"ZoomOut":d.interactionText="Afastar Mapa",a.map.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(b){var c=a.map.getView();c.setCenter(b.coordinate),c.setZoom(c.getZoom()-1)}}));break;case"ZoomBox":d.interactionText="Fazer Zoom de Caixa",a.map.addInteraction(new ol.interaction.DragZoom({condition:ol.events.condition.always,className:"drag_zoom_box"}));break;case"Identify":d.interactionText="Identificar Camadas",a.map.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(a){b.getLayersInfo(a,a.map.getView(),a.map.getLayers().getArray())}}))}d.interaction=c},this.getMapInteraction=function(){return d.interaction},this.getText=function(){return d.interactionText},this.setText=function(a){d.interactionText=a}}angular.module("MapInteractionsModule").service("MapInteractionsService",a),a.$inject=["MapService","LayerQueryResultsService","$http"]}(),function(){"use strict";function a(){return function(a){return angular.isNumber(a)?a:a?a.charAt(0).toUpperCase()+a.substr(1).toLowerCase():""}}angular.module("MapInteractionsModule").filter("capitalize",a)}(),function(){"use strict";function a(a,b){function c(){d.results=[]}var d=this;c(),d.title="Resultados da Pesquisa",a.$watchCollection(function(){return b.getResults()},function(a){d.results=a}),d.hasResults=function(){return d.results.length>0}}angular.module("MapInteractionsModule").controller("LayerResultsController",a),a.$inject=["$scope","LayerQueryResultsService"]}(),function(){"use strict";function a(a,b,c,d){d.setMapInteraction("DragPan"),this.search=!1,this.isActive=function(a){return this.active==a},this.setDefaultView=function(a){c.setDefaultView()},this.setInteraction=function(a){d.setMapInteraction(a)},this.showMenu=function(){this.menuIsHidden=!1},this.showSearchBar=function(){this.search=!this.search},this.isSearch=function(){return!this.search},a.$watch(function(){return d.getMapInteraction()},function(b){a.itCtrl.active=b}),a.$watch("itCtrl.active",function(){a.itCtrl.currentInteraction=d.getText()}),a.$watch("itCtrl.menuIsHidden",function(){b(function(){c.map.updateSize()},10)})}angular.module("MapInteractionsModule").controller("MapInteractionsController",a),a.$inject=["$scope","$timeout","MapService","MapInteractionsService"]}(),function(){"use strict";function a(a){function b(b,c,d){a.map.addControl(new ol.control.MousePosition({coordinateFormat:function(a){return ol.coordinate.format(a," {x} , {y} ",4)},projection:"EPSG:4326",className:"",target:document.getElementById("coordinate4326"),undefinedHTML:"&nbsp;"})),a.map.addControl(new ol.control.MousePosition({coordinateFormat:function(a){return ol.coordinate.format(a," {x} , {y} ",4)},projection:ol.proj.get("EPSG:27493"),className:"",target:document.getElementById("coordinate27493"),undefinedHTML:"&nbsp;"}))}var c={bindToController:!0,controller:"MapInteractionsController",controllerAs:"itCtrl",link:b,restrict:"E",scope:{menuIsHidden:"="},templateUrl:"app/templates/MapInteractionsTemplate.html"};return c}angular.module("MapInteractionsModule").directive("mapInteractions",a),a.$inject=["MapService"]}(),!function(){"use strict";angular.module("PrintingModule",["DrawingModule"])}(),function(){"use strict";function a(a){var b={"Planta de Ordenamento":[{type:"WMS",format:"image/png",layers:["cmvrpostgis:solo_rural","cmvrpostgis:solo_urbano","cmvrpostgis:solo_de_urbanizacao_programada","cmvrpostgis:estrutura_ecologica_urbana","cmvrpostgis:outras_instalacoes","cmvrpostgis:zonas_de_protecao_ao_aerodromo"],baseURL:"http://gistree.espigueiro.pt:8081/geoserver/wms",customParams:{}}],"Planta de Condicionantes":[{type:"WMS",format:"image/png",layers:["cmvrpostgis:reserva_agricola_nacional","cmvrpostgis:reserva_ecologica_nacional","cmvrpostgis:zonas_inundaveis","cmvrpostgis:pedreiras","cmvrpostgis:limite_da_rede_natura_2000","cmvrpostgis:aerodromo","cmvrpostgis:linhas_de_alta_tensao","cmvrpostgis:abastecimento_de_aguas_adutoras","cmvrpostgis:rede_rodoviaria","cmvrpostgis:rede_rodoviaria_prevista","cmvrpostgis:rede_ferroviaria","cmvrpostgis:vertices_geodesicos"],baseURL:"http://gistree.espigueiro.pt:8081/geoserver/wms",customParams:{}}]},c=[],d={};this.addNewResult=function(a){c.push(a)},this.getPrintResults=function(){return c},this.resetPrintResults=function(){c.splice(0,c.length)},this.setDetails=function(a){d=a},this.getDetails=function(){return d},this.getPrintSpec=function(c,e){var f={layout:"pdmLayout",srs:"EPSG:27493",units:"m",outputFormat:"pdf",mapTitle:c,type:e,layers:[],pages:[{center:ol.proj.transform(a.map.getView().getCenter(),"EPSG:3857",ol.proj.get("EPSG:27493")),scale:1e4,dpi:300}]};return f.outputFilename=c.split(" ").join("_"),f.pages[0].MapTitle=c,angular.copy(b[c],f.layers),angular.equals(a.userFeatures,{})||f.layers.push({type:"Vector",styles:{"":{strokeColor:"#000000",strokeWidth:"2",fillColor:"#ae0000",fillOpacity:.7}},opacity:"0.8",geoJson:JSON.parse(a.userFeatures)}),angular.extend(f.pages[0],d),f}}angular.module("PrintingModule").service("PrintDetailsService",a),a.$inject=["MapService"]}(),function(){"use strict";function a(a,b){function c(){d.userData={requerente:"",proprietario:"",nif:"",freguesia:"",local:""},b.setDetails(d.userData)}var d=this;c(),a.$on("resetPrinting",function(){c()})}angular.module("PrintingModule").controller("FormController",a),a.$inject=["$scope","PrintDetailsService"]}(),function(){"use strict";function a(a){function b(){c.selected=!1,a.getFreguesias(function(a){c.freguesias=a}),c.freguesia="Freguesia"}var c=this;b(),c.setFreguesia=function(a){c.selected=!0,c.freguesia=a.name},c.isSelected=function(){return c.selected}}angular.module("PrintingModule").controller("FreguesiasController",a),a.$inject=["LocationsFactory"]}(),function(){"use strict";function a(a,b,c,d){function e(){f.layouts=[{selected:!1,name:"Planta de Ordenamento",layout:"pdmLayout",title:"Planta de Ordenamento",escala:1e4,type:"ordenamento",tamanho:"A3"},{selected:!1,name:"Planta de Condicionantes",layout:"pdmLayout",title:"Planta de Condicionantes",type:"condicionantes",escala:1e4,tamanho:"A3"}],f.noSelect=!0}var f=this;e(),this.change=function(){f.noSelect=!f.layouts.some(function(a){return a.selected===!0})},this.printLayouts=function(){var a=[];f.layouts.forEach(function(d){d.selected&&a.push(c.post("https://gistree.espigueiro.pt:3001/geoserver",b.getPrintSpec(d.name,d.type)))}),d.all(a).then(function(a){a.forEach(function(a){var c="https://gistree.espigueiro.pt:3001/geoserver/"+a.data.getURL.split("/").pop();b.addNewResult({title:a.config.data.mapTitle,url:c})})})},a.$on("resetPrinting",function(){e()})}angular.module("PrintingModule").controller("LayoutSelectionController",a),a.$inject=["$scope","PrintDetailsService","$http","$q"]}(),function(){"use strict";function a(a){function b(){c.active=1}var c=this;b(),this.activeTab=function(a){return a==c.active},this.nextPage=function(a){a&&c.active++},a.$on("resetPrinting",function(){c.active=1})}angular.module("PrintingModule").controller("PagesController",a),a.$inject=["$scope"]}(),function(){"use strict";function a(a,b){function c(){d.printResults=b.getPrintResults(),d.message1="A processar o seu pedido.",d.message2="Por favor aguarde..."}var d=this;c(),this.newPrint=function(){a.$parent.$broadcast("resetPrinting"),b.resetPrintResults()}}angular.module("PrintingModule").controller("PrintResultController",a),a.$inject=["$scope","PrintDetailsService"]}(),!function(){"use strict";angular.module("SearchLocationModule",["ui.select","ngSanitize"])}(),function(){"use strict";angular.module("SearchLocationModule").filter("propsFilter",function(){return function(a,b){var c=[];if(angular.isArray(a)){var d=Object.keys(b);a.forEach(function(a){for(var e=!1,f=0;f<d.length;f++){var g=d[f],h=b[g].toLowerCase();if(a[g].toString().toLowerCase().indexOf(h)!==-1){e=!0;break}}e&&c.push(a)})}else c=a;return c}})}(),function(){"use strict";function a(a,b){function c(){a.getLocalidades(function(a){d.locations=a.features}),d.location={}}var d=this;c(),d.onSelectCallback=function(a){b.zoomToCoordinate(a.geometry.coordinates[0],"EPSG:27493")}}angular.module("SearchLocationModule").controller("LocationController",a),a.$inject=["LocationsFactory","MapService"]}();