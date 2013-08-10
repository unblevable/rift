#! /usr/bin/env node
/*
 * rift.io
 * 
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

var Server  = require('./server.js'),
    grunt   = require('grunt'),
    fs      = require('fs'),
    $       = require('jquery');

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
    $.get('http://localhost:4011/api/download', function(data) {
        console.log(data);
    });
}
else {
    console.log('Invalid command!');
    console.log('Valid Commands:');
    console.log('   create');
    console.log('   open');
}
