const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

module.exports = session({
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