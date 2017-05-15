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
        proxyReq.path = proxyReq.path + "create.json";
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
});

apiProxy.on('proxyRes', function (proxyRes, req, res) {
    res.on("data", (msg) => {
        console.log("msg", msg)
    })
    res.on("end", () => {
        console.log("end")
    })
    res.on("finish", (data) => {
        console.log("finish", data)
    })
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