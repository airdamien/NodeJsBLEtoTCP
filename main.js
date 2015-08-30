/*jslint node:true,vars:true,bitwise:true,unparam:true */

/*jshint unused:true */

/*
The BLE - Peripheral Node.js sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to advertise it's presence, read and write data via it's service and corresponding characteristic for Bluetooth Low Energy (BLE) communication.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing/updating MRAA & UPM Library on Intel IoT Platforms with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

OR
In Intel XDK IoT Edition under the Develop Tab (for Internet of Things Embedded Application)
Develop Tab
1. Connect to board via the IoT Device Drop down (Add Manual Connection or pick device in list)
2. Press the "Settings" button
3. Click the "Update libraries on board" option

Review README.md file for more information about enabling bluetooth and completing the desired configurations.

Article: https://software.intel.com/en-us/creating-a-bluetooth-low-energy-app/ 
*/

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;
shellCharacteristic
var FirstCharacteristic = require('./characteristic');
var shellCharacteristic = require('./shellCharacteristic');

//var tcpSocketHandler = require('./tcpSocket.js');

console.log('bleno - ble peripheral');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('feedback', ['fc0f']);
//      bleno.startAdvertising('025A7775-49AA-42BD-BBDB-E2AE77782966',['025A7775-49AA-42BD-BBDB-E2AE77782966']);

  }   
  else {
    if(state === 'unsupported'){
      console.log("NOTE: BLE and Bleno configurations not enabled on board, see README.md for more details...");
    }
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    console.log("settingServices");
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'fc0f',
        characteristics: [
          new FirstCharacteristic(),
          new shellCharacteristic()
        ]
      })
    ]);
  }
});

bleno.on('accept', function(clientAddress) {
    console.log("Accepted Connection with Client Address: " + clientAddress);
});

bleno.on('disconnect', function(clientAddress) {
    console.log("Disconnected Connection with Client Address: " + clientAddress);
});



