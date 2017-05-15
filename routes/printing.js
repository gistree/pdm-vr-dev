var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://gistree.espigueiro.pt:8081/geoserver/pdf/';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
    //proxyReq.path = proxyReq.path + "create.json";
});

apiProxy.on('error', function (err, req, res) {
    console.log(err);
});

router.post('/', function (req, res) {
    apiProxy.web(req, res, {
        target: geoserverPrint,
        ignorePath: true
    });
});

module.exports = router;