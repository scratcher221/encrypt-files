import { encrypt, decrypt } from "./crypto-helpers.js";
import { readFile, writeFile } from "fs/promises";
let decryptFileFunc = async function() {
	try {
		const cipherJSONString = await readFile("encrypted datafile.xlsx", "utf-8");
		const cipherObj = JSON.parse(cipherJSONString);
		console.log("decryptFileFunc:", cipherObj.iv);
		const plain = await decrypt(cipherObj);
		await writeFile("datafile.xlsx", plain);
	} catch (e) {
		console.error(e);
	}
}

let encryptFileFunc = async function() {
	try {
		const plain = await readFile("Data file example - Time Stamps per question (Robert).xlsx", "binary");
		const cipher = await encrypt(plain);
		const cipherJSONString = JSON.stringify(cipher);
		await writeFile("encrypted datafile.xlsx", cipherJSONString);
	} catch (e) {
		console.error(e);
	}
}


await encryptFileFunc();
await decryptFileFunc();