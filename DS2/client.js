const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const readline = require('readline-sync');
var inquirer = require('inquirer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

client.on('error', (err) => {
    console.log(`client error:\n${err.stack}`);
    client.close();
});

const requireLetterAndNumber = value => {
    if (/\w/.test(value) && /\d/.test(value)) {
        return true;
    }
    return 'Password need to have at least a letter and a number';
};

// const checkifid = value => {
//     if (value.match(/^\d+$/)) {
//         return true;
//     }
//     return 'You need to provide a number';
// };

const checkifgpa = value => {
    if ((value.match(/^\d+$/) || value.match(/^\d+\.\d+$/)) && value <= 10 && value > 5)
        return true;
    return 'Your GPA is invalid';
}

var questions = [{
        type: 'input',
        name: 'first_name',
        message: "Enter your username: "
    },
    {
        type: 'password',
        message: 'Enter password: ',
        name: 'password',
        mask: '*',
        validate: requireLetterAndNumber
    },
    // {
    //     type: 'input',
    //     name: 'id',
    //     message: "Enter your id: ",
    //     validate: checkifid
    // },
    {
        type: 'input',
        name: 'gpa',
        message: "Enter your GPA: ",
        validate: checkifgpa
    },
    {
        type: 'input',
        name: 'faculty',
        message: 'Enter faculty: '
    }
];

function myFunction(val) {
    if (val == null) { val = '' }
    inquirer.prompt({
            type: 'list',
            name: 'registering',
            message: "Do you want to register or log in?",
            choices: [
                'Register',
                'Log in',
                val
            ]
        })
        .then(answers => {
            if (answers.registering.toString() === 'Register') {
                inquirer.prompt(questions).then(answers => {
                    let answ = Object.values(answers).toString();
                    client.send([Buffer.from('r,'), Buffer.from(answ)], 14000, "localhost", (error) => {
                        if (error) console.log(error.stack);
                    });
                });
            } else if (answers.registering.toString() === 'Log in') {
                inquirer.prompt(questions.slice(0, 2)).then(answers => {
                    let answ = Object.values(answers).toString();
                    client.send([Buffer.from('l,'), Buffer.from(answ)], 14000, "localhost", (error) => {
                        if (error) console.log(error.stack);
                    });
                });
            } else {
                client.close();
            }
        });
}

client.on('message', (msg, rinfo) => {
    if (msg.toString() === 'Account already exists' || msg.toString() === "This account doesn't exist") {
        console.log(msg.toString());
        myFunction('Exit');
    } else {
        let message = msg.toString().split('!');
        let data = message[1].split(',');
        console.log(message[0]);
        console.log('User: ' + data[0]);
        console.log('ID: ' + data[2]);
        console.log('GPA: ' + data[3]);
        console.log('Faculty: ' + data[4]);
        myFunction('Exit');
    }
});
myFunction();

function encodeDesCBC(textToEncode, keyString, ivString) {
  var key = new Buffer(keyString.substring(0, 8), 'utf8');
  var iv = new Buffer(ivString.substring(0, 8), 'utf8');
  var cipher = crypto.createCipheriv('des-cbc', key, iv);
  var c = cipher.update(textToEncode, 'utf8', 'base64');
  c += cipher.final('base64');
  return c;
}