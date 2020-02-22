const mqtt = require('mqtt');

const args = process.argv.slice(2);
const [status, pilot, race] = args.map(n => +n);

const host = '192.168.8.100';

const client  = mqtt.connect(`mqtt://${host}`);
client.on('connect', function () {
   client.publish('controller_command', `${status} ${pilot} ${race}`); 
   client.end();
});

