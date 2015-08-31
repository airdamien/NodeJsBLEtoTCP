/*jslint node:true,vars:true,bitwise:true,unparam:true */
/*jshint unused:true */

var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;
var sys = require('sys');
//var exec = require('child_process').exec;
//var child;
var shellUpdateValueCallback = null;
var shellValue =  new Buffer("BUFFERBEGIN", "utf-8");

function run_cmd(cmd, args ) {
        console.log('runCmd=>'+cmd);
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) {
        resp += buffer.toString();
    });
    
    child.stdout.on('error', function(e) 
    {
    console.log('ShellCmd Error');
    });
    
//spawn.on('error', function (err) {
//  console.log('dir error', err);
//});
child.on('error', function (err) {
  console.log('Spawn Error=>', err);
});
    
    child.on("exit", function(code) {
    console.log(code);
    if (shellValue.toString() === "BUFFERBEGIN")
    {
        shellValue = new Buffer(resp, "utf-8");
        console.log('shellValue is BUFFERBEGIN');

    } else
    {
        var   dataBuffer =  new Buffer(resp, "utf-8");
        var newBuffer = Buffer.concat([shellValue,dataBuffer]);
        shellValue = newBuffer;
        console.log('shellValue is BUFFERBEGIN');
    }

    
      if (shellUpdateValueCallback) {
            console.log('shellUpdateValueCallback SHELL updatingValueCallback');
//          this._updateValueCallback(tcpValue);
            shellUpdateValueCallback(shellValue);
            shellValue = new Buffer("BUFFERBEGIN", "utf-8");
      }

});

    child.stdout.on('end', function() {
//        callBack (resp) 
        if (shellValue.toString() === "BUFFERBEGIN")
    {
        shellValue = new Buffer(resp, "utf-8");
        console.log('shellValue is BUFFERBEGIN');

    } else
    {
        var   dataBuffer =  new Buffer(resp, "utf-8");
        var newBuffer = Buffer.concat([shellValue,dataBuffer]);
        shellValue = newBuffer;
        console.log('shellValue is BUFFERBEGIN');
    }

    
      if (shellUpdateValueCallback) {
            console.log('shellUpdateValueCallback SHELL updatingValueCallback');
//          this._updateValueCallback(tcpValue);
            shellUpdateValueCallback(shellValue);
            shellValue = new Buffer("BUFFERBEGIN", "utf-8");
      }

    });
} // ()


//var runShellCommand = function(inputCmd,that)
//{
//    child = exec(inputCmd+"", function (error, stdout, stderr) {
//  sys.print('stdout: ' + stdout);
//  sys.print('stderr: ' + stderr);
//  sys.print('\n');
//    
//    if (shellValue.toString() === "BUFFERBEGIN")
//    {
//        shellValue = new Buffer(stdout, "utf-8");
//        console.log('tcpValue is BUFFERBEGIN');
//
//    } else
//    {
//        var   dataBuffer =  new Buffer(stdout, "utf-8");
//        var newBuffer = Buffer.concat([shellValue,dataBuffer]);
//        shellValue = newBuffer;
//        console.log('tcpValue is BUFFERBEGIN');
//    }
//
//    
//      if (shellUpdateValueCallback) {
//            console.log('shellUpdateValueCallback SHELL updatingValueCallback');
////          this._updateValueCallback(tcpValue);
//            shellUpdateValueCallback(shellValue);
//            shellValue = new Buffer("BUFFERBEGIN", "utf-8");
//      }
//
//  if (error !== null) {
//    console.log('exec error: ' + error);
//  }
//});

    
    
//};//runShellCommand

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
    var   sendDataBuffer =  new Buffer(shellValue);
    shellValue = new Buffer("BUFFERBEGIN", "utf-8");
//    tcpValue.length

  callback(this.RESULT_SUCCESS, sendDataBuffer);
//  callback(this.RESULT_SUCCESS, this._value);
};

shellCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
//  this._value = data;
    console.log('shellCharacteristic - onWriteRequest: value = ' + this._value.toString("utf-8"));
//    console.log('shellCharacteristic - onWriteRequest: value = ' + data.toString("utf-8"));

//  if (this._updateValueCallback) {
//    console.log('shellCharacteristic - onWriteRequest: notifying');
////    this._updateValueCallback(this._value);
//  }
    var shellStringToSend = data.toString("utf-8");
//    run_cmd(shellStringToSend,null);
    //    runShellCommand(shellStringToSend,this);

  callback(this.RESULT_SUCCESS);
};

shellCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('shellCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
   shellUpdateValueCallback = this._updateValueCallback;

};

shellCharacteristic.prototype.onUnsubscribe = function() {
  console.log('shellCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
shellUpdateValueCallback = this._updateValueCallback;

};

 



module.exports = shellCharacteristic;