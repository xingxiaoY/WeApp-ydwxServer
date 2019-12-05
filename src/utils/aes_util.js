const CryptoJS = require('./aes.js');					//引用AES源码js
var key = CryptoJS.enc.Utf8.parse("sinoprof12345678");	//十六位十六进制数作为秘钥
var iv = CryptoJS.enc.Utf8.parse('sinoprof12345678');	//十六位十六进制数作为秘钥偏移量
var ienabled = false;									//是否启用加密，true 启用，false 未启用

//解密的方法
function Decrypt(word){
	if(!ienabled) return word;
	var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}
//加密的方法
function Encrypt(word) {
	if(!ienabled) return word;
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	//return encrypted.ciphertext.toString().toUpperCase();   //这个是基础的16位16进制的加密返回值
	return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

//暴露接口
module.exports = {
	Decrypt: Decrypt,
	Encrypt: Encrypt
}

/**
 * 使用aes进行加密和解密的方法和列子
 * const CryptoJS = require('../../utils/aes_util.js');
 * console.log(CryptoJS.Encrypt("123456"),"加密~~");
 * console.log(CryptoJS.Decrypt("6TUyifP7PNWNQbvW/xPBog=="),"解密~~");
 */
