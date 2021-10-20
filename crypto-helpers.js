import crypto from "crypto";
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted
    };
};

const decrypt = (hash) => {
    console.log("Crypto helper, decrypt: IV:", hash.iv);
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    //console.log(hash.content);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content.data)), decipher.final()]);

    return decrypted;
};

export {
    encrypt,
    decrypt
};