var http = require('http');
var finalhandler = require('finalhandler');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var serveFavicon = require('serve-favicon');
var morgan = require('morgan');


var logger = morgan('combined');
// var logger = morgan('combined');

const port = process.argv[3] || 80;
const publicDir = process.argv[2] || '/data';
console.log(publicDir);


var index = serveIndex(publicDir, { 'icons': true, 'view': 'details' })
var serve = serveStatic(publicDir)
var favicon = serveFavicon('favicon.ico', { 'maxAge': 1 })

http.createServer((req, res) => {
    var done = finalhandler(req, res)
    favicon(req, res, function onNext(err) {
        if (err) return done(err)
        logger(req, res, function(err) {
            if (err) return done(err);
            serve(req, res, function onNext(err) {
                if (err) return done(err);
                index(req, res, done);
            });
        });
    }); // }
}).listen(port);
