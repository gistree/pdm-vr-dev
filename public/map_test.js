(function() {
    var osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var stamenLayer = new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: 'toner'
        }),
        opacity: 0.3
    });

    var center = ol.proj.transform([-7.699871063232422, 41.21637029336946], 'EPSG:4326', 'EPSG:3857');

    var view = new ol.View({
        center: center,
        zoom: 11
    });

    var map = new ol.Map({
        target: 'map',
        layers: [osmLayer],
        view: view
    });

    window.map = map;
    window.stamenLayer = stamenLayer;
    window.osmLayer = osmLayer;
})();