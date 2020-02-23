const mqtt = require('mqtt');
const { TELEMETRIA_IP } = require('./config.json');

const args = process.argv.slice(2);
const [status, pilot, race] = args.map(n => +n);

const client  = mqtt.connect(`mqtt://${TELEMETRIA_IP}`);
client.on('connect', function () {
   client.publish('controller_command', `${status} ${pilot} ${race}`); 
   client.end();
});

