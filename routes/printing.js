var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://localhost:8081/geoserver/pdf/create.json';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
});

router.post('/', function (req, res) {
    console.log(req.body);
    apiProxy.web(req, res, {
        target: geoserverPrint
    });
});

module.exports = router;