var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://gistree.espigueiro.pt:8081/geoserver/pdf/create.json';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {

});

apiProxy.on('proxyRes', function(proxyRes, req, res, options){
    console.log("In Response");
    console.log(proxyRes);
});


apiProxy.on('error', function (err, req, res) {
    console.log("IM IN ERROR");
    console.log(err);
});


router.post('/', function (req, res) {
    apiProxy.web(req, res, {
        target: geoserverPrint
    });
});

module.exports = router;