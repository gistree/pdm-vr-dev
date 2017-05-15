var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://localhost:8081/geoserver/pdf/';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {

});

apiProxy.on('error', function (err, req, res) {
    console.log("IM IN ERROR");
    console.log(err);
});

router.post('/', function (req, res) {
    console.log(req.path);
    req.path = req.path + "create.json";
    console.log(req.path);
    apiProxy.web(req, res, {
        target: geoserverPrint
    });
});

module.exports = router;