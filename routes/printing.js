var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://gistree.espigueiro.pt:8081/geoserver/pdf/create.json';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
    console.log("::::PROXY REQUEST::::");
    console.log(proxyReq);
    console.log("::::REQUEST::::");
    console.log(req);
});

apiProxy.on('error', function (err, req, res) {
    console.log("IM IN ERROR");
    console.log(err);
});


router.post('/', function (req, res) {
    console.log("IM IN THE PROXY!");
    apiProxy.web(req, res, {
        target: geoserverPrint
    });
});

module.exports = router;