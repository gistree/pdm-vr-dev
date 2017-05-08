'use strict';
var http = require('http');
var https = require('https');

var defaultOptions = {
    host: 'localhost',
    port: 8080,
    path: '/geoserver/rest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

var GeoserverREST = {};

GeoserverREST.getLayers = (options, cb) => {
    console.log("GeoserverREST::getLayers");
    options = Object.assign(defaultOptions, options);
    console.log("Host-> " + options.host);
    console.log("Port-> " + options.port);
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function (res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });
        res.on('end', function () {
            var obj = JSON.parse(output);
            cb(res.statusCode, obj);
        });
    });
    req.on('error', function (err) {
        cb(500, err);
    });
    req.end();
};

module.exports = GeoserverREST;