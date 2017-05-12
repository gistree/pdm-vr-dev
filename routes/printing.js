var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://localhost:8081/geoserver/pdf/create.json';

router.get('/', function (req, res) {
    console.log(req.baseUrl);
    apiProxy.web(req, res, {
        target: geoserverPrint
    });
});

module.exports = router;