var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://localhost:8081/geoserver/pdf/create.json';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
    console.log(req.baseURL);
    proxyReq.setHeader('X-Credentials', 'user=' + res.locals.username + '&pw=' + res.locals.pw);
});
router.post('/', function (req, res) {
    console.log("REACHED HERE");
    apiProxy.web(req, res, {
        target: geoserverPrint
    });
});

module.exports = router;