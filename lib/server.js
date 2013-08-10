exports.create = function (filePath,file) {

    // Module dependencies.
    var application_root    = __dirname,
        express             = require('express'),
        path                = require('path'),
        mongoose            = require('mongoose'),
        _                   = require('underscore'),
        fs                  = require('fs');

    //Create server
    var app = express();

    // Configure server
    app.configure(function() {
        //parses request body and populates request.body
        app.use(express.bodyParser());

        //checks request.body for HTTP method overrides
        app.use(express.methodOverride());

        //perform route lookup based on url and HTTP method
        app.use(app.router);

        //Where to serve static content
    //   app.use(express.static(path.join(application_root, 'site')));

        //Show all errors in development
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack:      true
        }));
    });

    //Start server
    var port = 4011;

    app.listen(port, function() {
    });

    //
    // Routes 
    // 
    
    app.get('/api/download', function (req,res) {
        console.log('Get request fired');
        //var path = req.params.path.replace(/~/g,'/');
        //fs.readFile(path, function (err,data) {
        res.send(file);
        //});
    });

}
