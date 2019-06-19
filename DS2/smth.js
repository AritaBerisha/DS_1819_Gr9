var forge = require('node-forge');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
var pki = forge.pki;

// DES-CBC
// var key =forge.random.getBytesSync(16);
// var iv = forge.random.getBytesSync(16);
 
// var cipher = forge.cipher.createCipher('DES-CBC', key);
// cipher.start({iv: iv});
// cipher.update(forge.util.createBuffer("Aurora"));
// cipher.finish();
// var encrypted = cipher.output;
// console.log(encrypted.toHex());

// var decipher = forge.cipher.createDecipher('DES-CBC', key);
// decipher.start({iv: iv});
// decipher.update(encrypted);
// var result = decipher.finish(); // check 'result' for true/false
// console.log(decipher.output.toString());


//JO DES BUT PUBLIC KEY ENCRYPTED
function encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
  const publicKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

function decrypt(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey)
  const privateKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: '',
    },
    buffer,
  )
  return decrypted.toString('utf8')
}

const enc = encrypt('Hello', `keys/publickey.cert`)
console.log('enc: ', enc)

const dec = decrypt(enc, `keys/privatekey.pem`)
console.log('dec: ', dec)