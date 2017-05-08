const express = require('express');
const app = express();
const router = express.Router();
const dbUser = require('../db/dbCon/user');

router.post('/login', dbUser.find, function (req, res) {
    req.session.username = res.locals.login.username;
    req.session.pw = res.locals.login.pw;
    console.log("::::LOGIN::::");
    console.log(req.session);
    res.status(200).json({
        username: res.locals.login.username,
        data: [{
            title: "Condicionantes",
            folder: true,
            expanded: false,
            children: [{
                title: "Parque Natural do Alvão",
                extraClasses: 'protected',
                data: {
                    protected: true,
                    workspace: "cmvrpostgis",
                    name: "limite_do_parque_natural_do_alvao",
                    type: "TileWMS",
                    extent: [24565.8138696318, 183894.59376334, 32871.2498912235, 193759.879997275],
                    opacity: 1,
                    queryable: true
                }
            }],
        }]
    });
});

router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        console.log("Session destroy");
    });
    res.status(200).json({});
});

module.exports = router;