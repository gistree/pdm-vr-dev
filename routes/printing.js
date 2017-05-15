var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://localhost:8081/geoserver/pdf/';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type','application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
    proxyReq.path = proxyReq.path + "create.json";
});

apiProxy.on('proxyRes', function(res, a,b){
    console.log("IN RESPONSE");
    console.log(res);
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