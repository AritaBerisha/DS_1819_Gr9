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

var privateKEY = fs.readFileSync('./keys/RsaPrivate.key', 'utf8');

var signOptions = {
    expiresIn: "12h",
    algorithm: "RS256"
};


const server = dgram.createSocket('udp4');
let saltedHash;

// const XeroClient = require('xero-node').AccountingAPIClient;
// const config = require('./config.json');

// const x509 = require('x509');
// var subject = x509.getSubject(fs.readFileSync('./publickey.cert').toString());

//console.log(subject);

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got message from ${rinfo.address}:${rinfo.port}`);
    /*(async () => {

        // You can initialise Private apps directly from your configuration
        let xero = new XeroClient(config);

        const result = await xero.invoices.get();

        console.log('Number of invoices:', result.Invoices.length);

    })();*/
    const [choice, username, password2, GPA, Faculty] = msg.toString().split(',');
    password = saltedSha1(password2, 'SUPER-S@LT!');
    if (choice === "r") {
        if (db.get("user").find({ username }).value()) {
            server.send("Account already exists", rinfo.port, rinfo.address);
        } else {
            db.get("user").push({
                username,
                password,
                ID:shortid.generate(),
                GPA,
                Faculty
            }).write();

            server.send("You've been registered!", rinfo.port, rinfo.address);
        }
    } else if (choice === "l") {
        if (db.get("user").find({ username }).value() &&
            db.get("user").find({ password }).value()) {
            var payload = db.get("user").find({ username }).value();
            delete payload.password;
            token = jwt.sign(payload, privateKEY, signOptions);

            server.send(token, rinfo.port, rinfo.address);
        } else if (!db.get("user").find({ username }).value()) {
            server.send("This account doesn't exist", rinfo.port, rinfo.address);
        } else if (!db.get("user").find({ password }).value()) {
            server.send("Wrong Password.", rinfo.port, rinfo.address);
        }

    }
});
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(14000);