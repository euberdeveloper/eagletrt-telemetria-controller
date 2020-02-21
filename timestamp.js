const mqtt = require('mqtt');
const moment = require('moment');

const host = '192.168.8.101';
const timestamp = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

const client  = mqtt.connect(`mqtt://${host}`);
client.on('connect', function () {
   client.publish('controller_timestamp', `"${timestamp}"`); 
   client.end();
});