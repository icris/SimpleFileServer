const express = require('express'),
    path = require('path'),
    http = require('http'),
    static = express.static,
    index = require('serve-index'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    app = express(),
    port = process.argv[3] || 8000,
    publicDir = process.argv[2] || '/data';


app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('combined'));
app.use(static(publicDir));
app.use(index(publicDir, { 'icons': true, 'view': 'details' }));

app.listen(port, o=> console.log(`sfs running on port: ${port}...`));
