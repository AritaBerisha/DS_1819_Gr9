const dgram = require('dgram');
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const saltedSha1 = require('salted-sha1');

const server = dgram.createSocket('udp4');
let saltedHash;

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got message from ${rinfo.address}:${rinfo.port}`);
    saltedHash = saltedSha1(SplitArray(msg.toString())[1], 'SUPER-S@LT!');
    if (db.get("user").find({ username: SplitArray(msg.toString())[0] }).value()) {
        server.send(Buffer.from("Username already Exists"), rinfo.port, rinfo.address);
    } else {
        db.get("user").push({
            username: SplitArray(msg.toString())[0],
            password: saltedHash,
            id: SplitArray(msg.toString())[2],
            AverageGrade: SplitArray(msg.toString())[3],
            Faculty: SplitArray(msg.toString())[4]
        }).write();
        server.send(Buffer.from("Thank u"), rinfo.port, rinfo.address);
    }


});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41237);

function SplitArray(array) {

    let array2 = array.split(" ");
    return array2;
}