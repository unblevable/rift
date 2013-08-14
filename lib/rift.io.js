#! /usr/bin/env node
/*
 * rift.io
 *
 *
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

var exec    = require('child_process').exec,
    fs      = require('fs'),
    http    = require('http'),

    $       = require('jquery'),
    crpyto  = require('crypto'),

    server  = require('./server.js');

'use strict';

var userArgs = process.argv.slice(2);

var command = userArgs[0];
var param = userArgs[1];

if (command == 'create') {
    console.log('Created Rift');
    console.log('File: '+param+' added to Rift!');

    server.create(param);
} else if (command == 'open') {
    console.log('Searching for Rift:');
    console.log(param);

    //var req = http.get('http://localhost:4011/api/download', function(res) {
    //    console.log('entered');
    //    var pageData = "";
    //    res.setEncoding('utf8');
    //    res.on('data', function (chunk) {
    //        pageData += chunk;
    //    });

    //    res.on('end', function(){
    //        console.log(pageData)
    //        console.log('done');
    //    });
    //});
    var decipher, data;
    decipher    = crypto.createDecipher('aes192','rift');
    data        = decipher.update(param,'hex','utf8');
    data        += decipher.final('utf8');

    // TODO: 'data' includes ip and port,
    // delete parsing done in server.js
    // and make public ip work
    $.get('http://0.0.0.0:3000/'+data, function (data) {

        var obj = JSON.parse(data);
        fs.writeFile(obj.name,obj.data, function (err) {
            if(!err) {
                console.log('saved!');
            } else {
                console.log('error!');
            }
        });
    });
} else {
    console.log('Invalid command!');
    console.log('Valid Commands:');
    console.log('   create');
    console.log('   open');
}
