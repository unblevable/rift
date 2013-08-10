#! /usr/bin/env node
/*
 * rift.io
 * 
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

var Server  = require('./server.js'),
    fs      = require('fs'),
    http    = require('http');

'use strict';

var userArgs = process.argv.slice(2);

var command = userArgs[0];
var param = userArgs[1];

if(command == 'create') {
    console.log('Created Rift');
    console.log('File: '+param+' added to Rift!');
    fs.readFile(param, function (err,data) {
        Server.create(param,data);
    });
}
else if(command == 'open') {
    console.log('Searching for Rift:');
    console.log(param);
    
    var req = http.get('http://localhost:4011/api/download', function(res) {
        var pageData = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            pageData += chunk;
        });

        res.on('end', function(){
            console.log(pageData)
        });
    });
}
else {
    console.log('Invalid command!');
    console.log('Valid Commands:');
    console.log('   create');
    console.log('   open');
}
