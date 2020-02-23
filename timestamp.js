const mqtt = require('mqtt');
const moment = require('moment');
const { TELEMETRIA_IP } = require('./config.json');

const timestamp = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

const client  = mqtt.connect(`mqtt://${TELEMETRIA_IP}`);
client.on('connect', function () {
   client.publish('controller_timestamp', `"${timestamp}"`); 
   client.end();
});