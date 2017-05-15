var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserverPrint = 'http://localhost:8081/geoserver/pdf/';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
    console.log(req.body);
    if (req.body) {
        console.log("IM in!");
        proxyReq.path = proxyReq.path + "create.json";
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }else{
        console.log(req.query._doc);
    }
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

router.get('/pdf', function(req,res){
    apiProxy.web(req, res, {
        target: geoserverPrint,
        ignorePath: true
    });
});

module.exports = router;