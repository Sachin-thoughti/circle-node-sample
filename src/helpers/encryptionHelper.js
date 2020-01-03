const crypto = require("crypto");
/**
 * Encryption Key. Must be 256 bits (32 characters). Should never change during production.
 */
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
/**
 * Bytes Length. For AES, this is always 16
 */
const IV_LENGTH = 16;

var encryptionHelpers = {
  /**
   * Encrypt string using aes-256-cbc ciper algorithm.
   */
  encrypt: text => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  },
  /**
   * Decrypt string using aes-256-cbc ciper algorithm.
   */
  decrypt: text => {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedString = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedString);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
};

module.exports = encryptionHelpers;
