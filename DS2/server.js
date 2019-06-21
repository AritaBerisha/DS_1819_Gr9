const dgram = require('dgram');
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const saltedSha1 = require('salted-sha1');
const shortid = require('shortid')
var inquirer = require('inquirer');
var forge = require('node-forge');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

var privateKEY = fs.readFileSync('./keys/RsaPrivate.key', 'utf8');

var signOptions = {
    expiresIn: "12h",
    algorithm: "RS256"
};

const server = dgram.createSocket('udp4');
let saltedHash;

// const x509 = require('x509');
// var subject = x509.getSubject(fs.readFileSync('./publickey.cert').toString());


server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got message from ${rinfo.address}:${rinfo.port}`);
    const [c, iv, rsaEncryptedKey] = msg.toString().split(",,");
    var privateKey = fs.readFileSync('./keys/privatekey.pem', 'utf8');
    const desKey = crypto.privateDecrypt(privateKey, Buffer.from(rsaEncryptedKey, 'base64'));
    const decrypted = crypto.createDecipheriv('des-cbc', Buffer.from(desKey), Buffer.from(iv, 'base64'));
    let d = decrypted.update(c, 'base64', 'utf8');
    d += decrypted.final('utf8');
    const [choice, username, password, GPA, Faculty] = d.toString().split(',');
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    //password = saltedSha1(password2, 'SUPER-S@LT!');
    if (choice === "r") {
        if (db.get("user").find({ username }).value()) {
            server.send("Account already exists", rinfo.port, rinfo.address);
        } else {
            db.get("user").push({
                username,
                password:hash,
                ID: shortid.generate(),
                GPA,
                Faculty
            }).write();
            server.send("You've been registered!", rinfo.port, rinfo.address);
        }
    } else if (choice === "l") {
        if (!db.get("user").find({ username }).value()) {
            server.send("This account doesn't exist", rinfo.port, rinfo.address);
        }else{
            let pass=Object.values(db.get("user").find({ username }).value())[1];
        if (db.get("user").find({ username }).value() &&
                bcrypt.compareSync(password, pass)) {
                //var payload = db.get("user").find({ username }).value();
                const { password, ...payload } = db.get("user").find({ username }).value();
                //delete payload.password;
                token = jwt.sign(payload, privateKEY, signOptions);

                server.send(token, rinfo.port, rinfo.address);
            }else if (!db.get("user").find({ password }).value()) {
                server.send("Wrong Password.", rinfo.port, rinfo.address);
            }
        } 
    }
});
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);

});

server.bind(12000);