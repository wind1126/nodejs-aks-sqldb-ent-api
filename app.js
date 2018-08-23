const express = require('express')
const app = express();

//Load fs and http, https libraries
var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey = fs.readFileSync('sslcerts/server.key', 'utf8');
var certificate = fs.readFileSync('sslcerts/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/v1/index');
var entRouter = require('./routes/v1/entitlements');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/entitlements', entRouter);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json('{}');
});

/** app.listen(8080, () => {
	console.log('Entitlements Service listening on port 8080')
});*/

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials,app);

httpServer.listen(8080);
console.log('HTTP listener running on port 8080');
httpsServer.listen(8443);
console.log('HTTPS listener running on port 8443');
