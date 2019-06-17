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
    const [choice, username, password2, ID, GPA, Faculty] = msg.toString().split(',');
    password = saltedSha1(password2, 'SUPER-S@LT!');
    if (choice === "r") {
        if (db.get("user").find({ username }).value()) {
            server.send("Account already exists", rinfo.port, rinfo.address);
        } else {
            db.get("user").push({
                username,
                password,
                ID,
                GPA,
                Faculty
            }).write();
            server.send(["You're now registered!", (Object.values(db.get("user").find({ username }).value())).toString()], rinfo.port, rinfo.address);
        }
    } else if (choice === "l") {
        if (db.get("user").find({ username }).value() &&
            db.get("user").find({ password }).value()) {
            server.send(["You're now logged in!", (Object.values(db.get("user").find({ username }).value())).toString()], rinfo.port, rinfo.address);
        } else {
            server.send("This account doesn't exist", rinfo.port, rinfo.address);
        }
    }
});
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(8080);