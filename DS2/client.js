const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const readline = require('readline-sync')

client.on('error', (err) => {
    console.log(`client error:\n${err.stack}`);
    client.close();
});

client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
let message = readline.question("Please Write in Order:\n your username,\n your password,\n your id,\n your average grade,\n your faculty\n Dont forget to sepearte each with space.");
client.send(Buffer.from(message), 41237, "localhost", (error) => {
    if (error) console.log(error.stack);
})