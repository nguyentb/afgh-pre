const PRE = require('./afgh_pre.js');

//Create the curve
PRE.init({g: "The generator for G1", h: "The generator for G2", returnHex: false}).then(params => {


    const plain = PRE.randomGen();

	// A is the delegator and B is the delegatee.
	// Generate the key-pairs (public and private keys) for A and B
    const A = PRE.keyGenInG1(params, {returnHex: true});		
    const B = PRE.keyGenInG2(params, {returnHex: true});

	// encrypt the plain with A's public key and decrypt it using A's private key
    const encrypted = PRE.enc(plain, A.pk, params, {returnHex: true});
    const decrypted = PRE.dec(encrypted, A.sk, params);

	// re-key: the delegator A calculates a re-encryption key (reKey) using its private key and B's public key
    const reKey = PRE.rekeyGen(A.sk, B.pk, {returnHex: true});

	// The Proxy will re-Encrypted the encrypted message (ciphertext) to a re-encrypted message
    const reEncypted = PRE.reEnc(encrypted, reKey, {returnHex: true});

	// The delegatee B receives the re-encrypted message and decrypt it with B's private key to get the plain text.
	// Thus, the re-decrypted message should be same as the plain text
    const reDecrypted = PRE.reDec(reEncypted, B.sk);

	// Verify digital signature
    const crypto = require('crypto');
    const msg = "Proxy Re-encryption test - Message from Nguyen Truong";
    const hash = crypto.createHash('sha256');
    hash.update(msg);
    const msgHash = hash.digest('hex');

    const sig = PRE.sign(msgHash, A.sk);
    const C = PRE.keyGenInG1(params, {returnHex: false});


    console.log("plain\n", plain);
    console.log("A's key pair\n", A);
    console.log("B's key pair\n", B);
    console.log("encrypted\n", encrypted);
    console.log("decrypted\n", decrypted);
    console.log("reKey\n", reKey);
    console.log("reEncypted\n", reEncypted);
    console.log("reDecrypted\n", reDecrypted);

    // The decrypted and reDecrypted should be same as the plain text.
		console.log("plain==decrypted==reDecrypted:", plain === decrypted && plain === reDecrypted);
    console.log("A's signature", sig);

    console.log("verify A's signature by A's pk:", PRE.verify(msgHash, sig, A.pk, params));
    console.log("verify A's signature by C's pk:", PRE.verify(msgHash, sig, C.pk, params))

}).catch(err => {
    console.log(err)
});
