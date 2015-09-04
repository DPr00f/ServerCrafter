import config from '../../config';
import crypto from 'crypto';

// Thanks to http://lollyrock.com/articles/nodejs-encryption/

function encrypt(text){
  var cipher = crypto.createCipher(config.CIPHER_ALGORITHM, config.CIPHER_SECRET);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(config.CIPHER_ALGORITHM, config.CIPHER_SECRET);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

export default {
  encrypt: encrypt,
  decrypt: decrypt
};
