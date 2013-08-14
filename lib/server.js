exports.create = function (filePath) {

    // Module dependencies.
    var fs                  = require('fs'),
        exec                = require('child_process').exec,
        http                = require('http'),

        crypto              = require('crypto'),
        scan                = require('portscanner'),

        application_root    = __dirname;

    // Retrieve public IP address of server
    exec('curl ifconfig.me', function (err, stdout, stderr) {
        if (!err) {
            var ip = stdout.replace(/\s/g,'');

            // Scan for open port
            scan.findAPortNotInUse(3000, 4000, '0.0.0.0', function (err, _port) {
                if (!err) {
                    var port = _port, md5Path, info, cipher, token, arr, fileName;

                    //extract file name
                    arr         = filePath.split('/');
                    fileName    = arr[arr.length-1];

                    // MD5 filePath to make a clean route
                    md5Path = '/' + crypto.createHash('md5').update(filePath,'utf8').digest('hex');

                    // Put together IP port and file name here
                    info = ip + ':' + port + md5Path;

                    console.log(info);

                    // Create the token
                    cipher  = crypto.createCipher('aes192','rift');
                    token   = cipher.update(info,'utf8','hex');
                    token   += cipher.final('hex');
                    console.log('Copy this Rift token: ');
                    console.log(token);

                    Server(md5Path,fileName,ip,port);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
            console.log(stderr);
        }
    });

    // url      -> request route
    // fileName -> To send receiver file name
    // ip       -> ??
    // port     -> available port
    function Server (url,fileName,ip,port) {
        // Create the http server.
        var app = http.createServer( function (req, res) {

            // Get rid of this parsing once coresponding
            // problem in rift.io.js is fixed
            var route = req.url.split('/');
            route = '/' + route[route.length-1];

            if (route == url) {
                // Read the file at path
                fs.readFile(filePath, 'utf-8', function (err, data) {
                    var payload = {
                        name: fileName,
                        data: data
                    }
                    if (!err) {
                        res.end(JSON.stringify(payload));
                    } else {
                        console.log('Hey mang, file probably doesnt exist.');
                    }

                });
            } else {
                // Indicate that requested file was not found.
                res.writeHead(404);

                // And end request without sending any data.
                res.end();
            }

        // Listen on the 8080 port.
        }).listen(port,'0.0.0.0');
    }
}
