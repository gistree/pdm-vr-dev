!function(){"use strict";angular.module("PrintingModule",["DrawingModule"])}(),function(){"use strict";function a(a){var b={"Planta de Ordenamento":[{type:"WMS",format:"image/png",layers:["cmvrpostgis:solo_rural","cmvrpostgis:solo_urbano","cmvrpostgis:solo_de_urbanizacao_programada","cmvrpostgis:estrutura_ecologica_urbana","cmvrpostgis:outras_instalacoes","cmvrpostgis:zonas_de_protecao_ao_aerodromo"],baseURL:"http://gistree.espigueiro.pt:8081/geoserver/wms",customParams:{}}],"Planta de Condicionantes":[{type:"WMS",format:"image/png",layers:["cmvrpostgis:reserva_agricola_nacional","cmvrpostgis:reserva_ecologica_nacional","cmvrpostgis:zonas_inundaveis","cmvrpostgis:pedreiras","cmvrpostgis:limite_da_rede_natura_2000","cmvrpostgis:aerodromo","cmvrpostgis:linhas_de_alta_tensao","cmvrpostgis:abastecimento_de_aguas_adutoras","cmvrpostgis:rede_rodoviaria","cmvrpostgis:rede_rodoviaria_prevista","cmvrpostgis:rede_ferroviaria","cmvrpostgis:vertices_geodesicos"],baseURL:"http://gistree.espigueiro.pt:8081/geoserver/wms",customParams:{}}]},c=[],d={};this.addNewResult=function(a){c.push(a)},this.getPrintResults=function(){return c},this.resetPrintResults=function(){c.splice(0,c.length)},this.setDetails=function(a){d=a},this.getDetails=function(){return d},this.getPrintSpec=function(c,e){var f={layout:"pdmLayout",srs:"EPSG:27493",units:"m",outputFormat:"pdf",mapTitle:c,type:e,layers:[],pages:[{center:ol.proj.transform(a.map.getView().getCenter(),"EPSG:3857",ol.proj.get("EPSG:27493")),scale:1e4,dpi:300}]};return f.outputFilename=c.split(" ").join("_"),f.pages[0].MapTitle=c,angular.copy(b[c],f.layers),angular.equals(a.userFeatures,{})||f.layers.push({type:"Vector",styles:{"":{strokeColor:"#000000",strokeWidth:"2",fillColor:"#ae0000",fillOpacity:.7}},opacity:"0.8",geoJson:JSON.parse(a.userFeatures)}),angular.extend(f.pages[0],d),f}}angular.module("PrintingModule").service("PrintDetailsService",a),a.$inject=["MapService"]}(),function(){"use strict";function a(a,b){function c(){d.userData={requerente:"",proprietario:"",nif:"",freguesia:"",local:""},b.setDetails(d.userData)}var d=this;c(),a.$on("resetPrinting",function(){c()})}angular.module("PrintingModule").controller("FormController",a),a.$inject=["$scope","PrintDetailsService"]}(),function(){"use strict";function a(a){function b(){c.selected=!1,a.getFreguesias(function(a){c.freguesias=a}),c.freguesia="Freguesia"}var c=this;b(),c.setFreguesia=function(a){c.selected=!0,c.freguesia=a.name},c.isSelected=function(){return c.selected}}angular.module("PrintingModule").controller("FreguesiasController",a),a.$inject=["LocationsFactory"]}(),function(){"use strict";function a(a,b,c,d){function e(){f.layouts=[{selected:!1,name:"Planta de Ordenamento",layout:"pdmLayout",title:"Planta de Ordenamento",escala:1e4,type:"ordenamento",tamanho:"A3"},{selected:!1,name:"Planta de Condicionantes",layout:"pdmLayout",title:"Planta de Condicionantes",type:"condicionantes",escala:1e4,tamanho:"A3"}],f.noSelect=!0}var f=this;e(),this.change=function(){f.noSelect=!f.layouts.some(function(a){return a.selected===!0})},this.printLayouts=function(){var a=[];f.layouts.forEach(function(d){d.selected&&a.push(c.post("https://gistree.espigueiro.pt:3001/geoserver",b.getPrintSpec(d.name,d.type)))}),d.all(a).then(function(a){a.forEach(function(a){b.addNewResult({title:a.config.data.mapTitle,url:a.data.getURL})})})},a.$on("resetPrinting",function(){e()})}angular.module("PrintingModule").controller("LayoutSelectionController",a),a.$inject=["$scope","PrintDetailsService","$http","$q"]}(),function(){"use strict";function a(a){function b(){c.active=1}var c=this;b(),this.activeTab=function(a){return a==c.active},this.nextPage=function(a){a&&c.active++},a.$on("resetPrinting",function(){c.active=1})}angular.module("PrintingModule").controller("PagesController",a),a.$inject=["$scope"]}(),function(){"use strict";function a(a,b){function c(){d.printResults=b.getPrintResults(),d.message1="A processar o seu pedido.",d.message2="Por favor aguarde..."}var d=this;c(),this.newPrint=function(){a.$parent.$broadcast("resetPrinting"),b.resetPrintResults()}}angular.module("PrintingModule").controller("PrintResultController",a),a.$inject=["$scope","PrintDetailsService"]}();