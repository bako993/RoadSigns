import crypto from 'crypto';

const secretKey = crypto.randomBytes(64).toString('base64');

console.log(secretKey);