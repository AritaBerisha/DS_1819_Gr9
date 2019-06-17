const dgram = require('dgram');
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const saltedSha1 = require('salted-sha1');
var inquirer = require('inquirer');

const server = dgram.createSocket('udp4');
let saltedHash;

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got message from ${rinfo.address}:${rinfo.port}`);
    const [username, password2, id, AverageGrade, Faculty] = msg.toString().split(' ');
    password = saltedSha1(password2, 'SUPER-S@LT!');
    if (db.get("user").find({ username: username }).value()) {
        server.send(Buffer.from("Username already Exists"), rinfo.port, rinfo.address);
    } else {
        db.get("user").push({
            username,
            password,
            id,
            AverageGrade,
            Faculty
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