const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
// Aplication Version
app.set("version", process.env.npm_package_version);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session Definition
app.use(require('./config/session'));
// CORS ENABLING
app.use('*', require('./config/cors'));
// USE HTTPS SERVER
app.all('*', function (req, res, next) {
    if (req.secure) {
        return next();
    };
    res.redirect('https://' + req.hostname + ':' + 443 + req.url);
});
// Routing Definition
app.use('/', require('./routes/index'));
app.use('/credentials/', require('./routes/credentials'));
app.use('/proxy/', require('./routes/proxy'));
app.use('/api/', require('./routes/resources'));
// Error Handling
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;