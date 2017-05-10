var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

// Proxy Server Definition
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var geoserver = 'http://localhost/geoserver/wms/';

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
    proxyReq.setHeader('X-Credentials', 'user=' + res.locals.username + '&pw=' + res.locals.pw);
});

router.get('/', function (req, res, next) {
    res.locals.username = req.session.username || "";
    res.locals.pw = req.session.pw || "";
    next();
}, function (req, res) {
    apiProxy.web(req, res, {
        target: geoserver
    });
});

module.exports = router;