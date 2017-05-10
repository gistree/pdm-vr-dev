const express = require('express');
const app = express();
const router = express.Router();
const dbUser = require('../db/dbCon/user');
const Session = require('../config/session');
const Layers = require('../utilities/layers');

router.post('/login', dbUser.find, Session.login, Layers.getUserLayers, function (req, res) {
    res.status(200).json({
        username: res.locals.username,
        layers: res.locals.layers
    });
});

router.post('/logout', Session.logout, function (req, res) {
    res.status(200).json({
        message: "Logout Successfull."
    });
});

module.exports = router;