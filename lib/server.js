exports.create = function (filePath) {

    // Module dependencies.
    var application_root    = __dirname,
        http                = require('http'),
        fs                  = require('fs');

    //Create server
    var app = http.createServer().listen(4011,'127.0.0.1');


    //Start server
    http.get('/api/download', function (req,res) {
        console.log('Get request fired');

        response.writeHead(200, {});
        var readStream = fs.createReadStream(filePath);
        readStream.pipe(response);

    });

}
