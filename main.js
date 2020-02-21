const mqttNow = require('mqtt-now');
const { execSync } = require("child_process");

const IP = 'localhost';

function controllerCommand(message) {
    const [status, pilot, race] = message.
        split(' ')
        .map(n => +n)
        .map(n => n.toString(16))
        .map(n => `0${n}`);
    const command = `cansend can0 0A0#65${status}${pilot}${race}`;
    execSync(command);
}

function controllerTimestamp(message) {
    const timestamp = message;
    const command = `date --set ${timestamp}`;
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