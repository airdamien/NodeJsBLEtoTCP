/*jslint node:true,vars:true,bitwise:true,unparam:true */
/*jshint unused:true */

var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;
var sys = require('sys')
var exec = require('child_process').exec;
var child;

//var exports = module.exports = {};
//var net = require('net');
//var s = require('net').Socket();
////  this._value = new Buffer("Hello World from Edison!", "utf-8");
//var tcpValue =  new Buffer("TCPINITIAL", "utf-8");
////
// var HOST = '10.0.1.20';
// var PORT = 60128;
//s.connect(PORT, HOST);
//
//    s.on('error', function(e) {
//    if(e.code == 'ECONNREFUSED') {
//        console.log('Is the server running at ' + PORT + '?');
//
//        s.setTimeout(4000, function() {
//            s.connect(PORT, HOST, function(){
//                console.log('CONNECTED TO: ' + HOST + ':' + PORT);
//                s.write('I am the inner superman');
//            });
//        });
//
//        console.log('Timeout for 5 seconds before trying port:' + PORT + ' again');
//
//    }
//    });
//
////s.write('GET http://www.google.com/ HTTP/1.1\n\n');
//
//s.on('data', function(d){
//    console.log("S_ON DATA=>"+d.toString());
////    tcpValue =  Buffer(d, "utf-8");
//    
//    var   dataBuffer =  new Buffer(d, "utf-8");
//    var newBuffer = Buffer.concat([tcpValue,dataBuffer]);
//    tcpValue = newBuffer;
////    s.end();
//    
//});

//s.end();
//var sendDataToTcp = function(sendString,that) {
//
//var client = new net.Socket();
//
// var HOST = '10.0.1.20';
// var PORT = 60128;
//
// client.connect(PORT, HOST, function(){
//    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
//     var writeString = sendString+'\r\n';
////   client.write('?VL\r\n');
//        client.write(writeString);
//});
//
//    
//    
//    client.on('error', function(e) {
//    if(e.code == 'ECONNREFUSED') {
//        console.log('Is the server running at ' + PORT + '?');
//
//        client.setTimeout(4000, function() {
//            client.connect(PORT, HOST, function(){
//                console.log('CONNECTED TO: ' + HOST + ':' + PORT);
//                client.write('I am the inner superman');
//            });
//        });
//
//        console.log('Timeout for 5 seconds before trying port:' + PORT + ' again');
//
//    }   
//});
//client.on('data', function(data) {
//    console.log('DATA: ' + data);
////    that.value
//    tcpValue =  Buffer(data, "utf-8");
////    client.destroy();
//    client.end();
//});
//client.on('close', function() {
//    console.log('Connection closed');
//});
//     
// };
var shellCharacteristic = function() {
  shellCharacteristic.super_.call(this, {
    uuid: 'fcff',
    properties: ['read', 'write', 'notify'],
    value: null
  });

//  this._value = new Buffer("Hello World from Edison!", "utf-8");
      this._value = new Buffer("Hello World from Edison!", "utf-8");

  console.log("shellCharacteristic's value: "+this._value);
    // executes `pwd`
child = exec("pwd", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  sys.print('\n');

  if (error !== null) {
    console.log('exec error: ' + error);
  }
});

    
  this._updateValueCallback = null;
};


util.inherits(shellCharacteristic, BlenoCharacteristic);
shellCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('shellCharacteristic - onReadRequest: value = ' + this._value.toString("utf-8"));
//  console.log('shellCharacteristic - onReadRequest: tcpValue = ' + tcpValue.toString("utf-8"));
//  console.log('shellCharacteristic - onReadRequest: tcpValueLength = ' + tcpValue.length);
//    var   sendDataBuffer =  new Buffer(tcpValue, "utf-8");
//    var   sendDataBuffer =  new Buffer(tcpValue);
//    tcpValue = new Buffer("\nBUFFERBEGIN\n", "utf-8");
//    tcpValue.length

  callback(this.RESULT_SUCCESS, this._value);
};

shellCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;
    console.log('shellCharacteristic - onWriteRequest: value = ' + this._value.toString("utf-8"));
//    console.log('shellCharacteristic - onWriteRequest: value = ' + data.toString("utf-8"));

  if (this._updateValueCallback) {
    console.log('shellCharacteristic - onWriteRequest: notifying');

    this._updateValueCallback(this._value);
//    client.write("?VL\r\n");
//          client.write("%s\r\n",this._value.toString("utf-8"));
//      sendDataToTcp.write("%s\r\n",this._value.toString("utf-8"));
      var rcvStringToSend = data.toString("utf-8");
//      sendDataToTcp(rcvStringToSend,this);
//      var writeString = rcvStringToSend+'\r\n';
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);
//      s.write(rcvStringToSend);

//      sendDataToTcp(sendString);
  }

  callback(this.RESULT_SUCCESS);
};

shellCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('shellCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

shellCharacteristic.prototype.onUnsubscribe = function() {
  console.log('shellCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

 

     
// };
//    
//    
//    var client = net.connect({port: 60128,host: '10.0.1.20'},
//    function() { //'connect' listener
//  console.log('connected to server!');
//  client.write('%s\r\n',sendString);
//});
//
//client.on('data', functions(data) {
//  console.log(data.toString());
//  client.end();
//});
//
//client.on('end', function() {
//  console.log('disconnected from server');
//});
//
////
////var socket = net.createConnection(port, host);
////console.log('Socket created.');
////socket.on('data', function(data) {
////  // Log the response from the HTTP server.
////  console.log('RESPONSE: ' + data);
////}).on('connect', function() {
////  // Manually write an HTTP request.
////  socket.write("GET / HTTP/1.0\r\n\r\n");
////}).on('end', function() {
////  console.log('DONE');
////});
//

//}

//} //tcpSocketHandler

//module.exports = tcpSocketHandler;

module.exports = shellCharacteristic;