const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

var Session = {};

Session.sessionOptions = session({
    store: new pgSession({
        conString: require('./database'),
        schemaName: 'public'
    }),
    secret: 'ThisisaSecret',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        secure: true,
        httpOnly: true
    }
});

Session.login = function (req, res, next) {
    req.session.username = res.locals.login.username;
    req.session.pw = res.locals.login.pw;
    res.locals.username = res.locals.login.username;
    next();
};

Session.logout = function (req, res, next) {
    req.session.destroy(function (err) {
        console.log("Session destroy");
    });
    next();
};

module.exports = Session;