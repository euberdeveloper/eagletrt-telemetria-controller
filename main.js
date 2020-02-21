const mqttNow = require('mqtt-now');
const { execSync } = require("child_process");

const IP = 'localhost';

function controllerCommand(message) {
    console.log(`RECEIVED COMMAND`);
    const [status, pilot, race] = message.
        split(' ')
        .map(n => +n)
        .map(n => n.toString(16))
        .map(n => `0${n}`);
    console.debug(`status:\t${status}`);
    console.debug(`pilot:\t${pilot}`);
    console.debug(`race:\t${race}`);
    const command = `cansend can0 0A0#65${status}${pilot}${race}`;
    console.debug(`command:\t${command}`);
    execSync(command);
}

function controllerTimestamp(message) {
    console.log(`RECEIVED TIMESTAMP`);
    const timestamp = message;
    console.debug(`timestamp:\t${timestamp}`);
    const command = `date --set ${timestamp}`;
    console.debug(`command:\t${command}`);
    execSync(command);
}

mqttNow.subscribe({
    host: IP,
    actions: [
        {
            topic: 'controller_command',
            onMessage: controllerCommand
        },
        {
            topic: 'controller_timestamp',
            onMessage: controllerTimestamp
        },
    ],
    messageType: mqttNow.MessageType.STRING
});
console.log(`Telemetria controller listening on ${host}`);