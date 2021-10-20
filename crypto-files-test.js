import { encrypt, decrypt } from "./crypto-helpers.js";
import { readFile, writeFile } from "fs/promises";

const inputFileName = "Data file example - Time Stamps per question (Robert).xlsx";

let decryptFileFunc = async function() {
	try {
		const cipherJSONString = await readFile("encrypted datafile");
		const cipherObj = JSON.parse(cipherJSONString);
		console.log("decryptFileFunc:", cipherObj.iv);
		const plain = await decrypt(cipherObj);
		await writeFile("datafile", plain);
	} catch (e) {
		console.error(e);
	}
}

let encryptFileFunc = async function() {
	try {
		const plain = await readFile(inputFileName);
		const cipher = await encrypt(plain);
		const cipherJSONString = JSON.stringify(cipher);
		await writeFile("encrypted datafile", cipherJSONString);
	} catch (e) {
		console.error(e);
	}
}


await encryptFileFunc();
await decryptFileFunc();