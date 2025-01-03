// use node's build in crypto module to generate a JWT token secret

const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');

console.log(secret);