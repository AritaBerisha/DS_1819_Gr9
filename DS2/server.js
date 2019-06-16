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

server.on('message', (msg,rinfo)=>{
    console.log(`server got message from ${rinfo.address}:${rinfo.port}`);
    let el=msg.toString().split(',');
    saltedHash = saltedSha1(el[2], 'SUPER-S@LT!');
    if(el[0]==='r'){
        if (db.get("user").find({ username: el[1] }).value()) {
            server.send("Account already exists", rinfo.port, rinfo.address);
        } else {
            db.get("user").push({
                username: el[1],
                password: saltedHash,
                ID:el[3],
                GPA:el[4],
                Faculty: el[5]
            }).write();
            server.send(["You're now registered!",(Object.values(db.get("user").find({ username: el[1] }).value())).toString()], rinfo.port, rinfo.address);
        }
    }else if(el[0]==='l'){
        if(db.get("user").find({ username: el[1] }).value() && 
            db.get("user").find({ password: saltedHash }).value()){
            server.send(["You're now logged in!",(Object.values(db.get("user").find({ username: el[1] }).value())).toString()], rinfo.port, rinfo.address);
        }else{
            server.send("This account doesn't exist",rinfo.port, rinfo.address);
        }
    }
});
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(8080);
