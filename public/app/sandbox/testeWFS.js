(function () {

    var tiledRaster = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var center = ol.proj.transform([-72.6, 41.7], 'EPSG:4326', 'EPSG:3857');
    var view = new ol.View({
        center: center,
        zoom: 12,
    });
    var fill = new ol.style.Fill({
        color: 'rgba(0,0,0,0.2)'
    });
    var stroke = new ol.style.Stroke({
        color: 'rgba(0,0,0,0.4)'
    });
    var circle = new ol.style.Circle({
        radius: 6,
        fill: fill,
        stroke: stroke
    });
    var vectorStyle = new ol.style.Style({
        fill: fill,
        stroke: stroke,
        image: circle
    });
    var loadFeatures = function (response) {
        var format = new ol.format.GeoJSON();
        var features = format.readFeatures(response);
        vectorSource.addFeatures(features);
    };
    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        loader: function (extent, resolution, projection) {
            console.log("IN LOADER");
            var url = "http://demo.boundlessgeo.com/geoserver/wfs?service=WFS&" +
                "version=1.1.0&request=GetFeature&typename=osm:builtup_area&" +
                "outputFormat=text/javascript&format_options=callback:loadFeatures" +
                "&srsname=EPSG:3857&bbox=" + extent.join(',') + ",EPSG:3857";
            $.ajax({
                url: url,
                dataType: 'jsonp'
            })
        },
        strategy: ol.loadingstrategy.bbox,
        projection: 'EPSG:3857',
    });
    var serverVector = new ol.layer.Vector({
        source: vectorSource,
        style: vectorStyle
    });
    var map = new ol.Map({
        renderer: 'canvas',
        target: 'map',
        layers: [tiledRaster],
        view: view
    });

    map.addLayer(serverVector);

    window.serverVector = serverVector;
    window.loadFeatures = loadFeatures;
    window.vectorSource = vectorSource;

})();