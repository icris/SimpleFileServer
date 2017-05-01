const http = require('http'),
    finalhandler = require('finalhandler'),
    serveIndex = require('serve-index'),
    serveStatic = require('serve-static'),
    serveFavicon = require('serve-favicon'),
    morgan = require('morgan'),

    port = process.argv[3] || 8000,
    publicDir = process.argv[2] || '/data',

    favicon = serveFavicon('favicon.ico'),
    logger = morgan('combined'),
    index = serveIndex(publicDir, { 'icons': true, 'view': 'details' }),
    serve = serveStatic(publicDir);


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
}).listen(port, o=> console.log(`sfs running on port: ${port}...`) );
