exports.create = function (filePath) {

    // Module dependencies.
    var application_root    = __dirname,
        http                = require('http'),
        fs                  = require('fs'),
        crypto              = require('crypto'),
        scan                = require('portscanner'),
        exec                = require('child_process').exec;
        
    // Retrieve public IP address of server
    exec('curl ifconfig.me', function (err, stdout, stderr) {
        if(!err) {
            var ip = stdout.replace(/\s/g,'');

            // Scan for open port 
            scan.findAPortNotInUse(3000, 4000, '0.0.0.0', function (err, _port) {
                if(!err) {
                    var port = _port, md5Path, info, cipher, token; 
                    
                    // MD5 filePath to make a clean route
                    md5Path = '/' + crypto.createHash('md5').update(filePath,'utf8').digest('hex');

                    // Put together IP port and file name here
                    info = ip + ':' + port + md5Path; 
                    
                    console.log(info);

                    // Create the token 
                    cipher  = crypto.createCipher('aes192','rift');
                              cipher.update(info,'utf8','hex');
                    token   = cipher.final('hex');

                    console.log('Copy this Rift token: ');
                    console.log(token);
        
                    Server(md5Path,ip,port); 

                } else {
                    console.log(err);
                }
            });

        } else {
            console.log(err);
            console.log(stderr);
        }
    }); 

    
    
    
    function Server (url,ip,port) {
    
        // Create the http server.
        var app = http.createServer( function (req, res) {
                 
            console.log('Server up!'); 

            if (req.url == url) {

                // Read the file at path
                fs.readFile(filePath, 'utf-8', function (err, data) {
                    
                    if(!err) {
                        res.end(data); 
                    } else {
                        console.log(err);
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
