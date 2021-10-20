import { encrypt, decrypt } from "./crypto-helpers.js";
import FileReader from "filereader";

const encryptFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file);
		var c;
		reader.onload = function() {
		  const plain = reader.result;
		  c = encrypt(plain);
		  resolve(c);
		}
		reader.onerror = function() {
		  reject(reader.error);
		}
  });
}

const decryptFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file);
		var p;
		reader.onload = function() {
			const cipher = reader.result;
			var cipherObj = JSON.parse(cipher);
			p = decrypt(cipher);
			resolve(p);
		}
		reader.onerror = function() {
			reject(reader.error);
		}
	});
}
export {
  encryptFile,
  decryptFile
};