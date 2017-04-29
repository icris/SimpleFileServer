const http = require('http');
const finalhandler = require('finalhandler');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const serveFavicon = require('serve-favicon');
const morgan = require('morgan');


const port = process.argv[3] || 8000;
const publicDir = process.argv[2] || '/data';


const favicon = serveFavicon('favicon.ico');
const logger = morgan('combined');
const index = serveIndex(publicDir, { 'icons': true, 'view': 'details' });
const serve = serveStatic(publicDir);


http.createServer((req, res) => {
    let done = finalhandler(req, res);
    favicon(req, res, err => {
        if (err) return done(err);
        logger(req, res, err => {
            if (err) return done(err);
            serve(req, res, err => {
                if (err) return done(err);
                index(req, res, done);
            });
        });
    });
}).listen(port);
console.log(`sfs running on port: ${port}...`);
