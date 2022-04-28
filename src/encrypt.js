// https://github.com/mdn/dom-examples/blob/master/web-crypto/encrypt-decrypt/aes-cbc.js
let key, iv, cipher

function getMessage() {
  const input = document.getElementById('message')
  const message = input.value
  const encoder = new TextEncoder()
  return encoder.encode(message)
}

function getNewIV() {
  return window.crypto.getRandomValues(new Uint8Array(16))
}

function encrypt(message) {
  console.log({ iv, key })
  return window.crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, message)
}

function decrypt() {
  console.log({ iv, key, cipher })
  return window.crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, cipher )
}

function generateKey() {
  return window.crypto.subtle.generateKey({ name: "AES-CBC", length: 256 },
    true, ["encrypt", "decrypt"])
}

// fetches the text in a the box and encrypts it
// with the iv and value
export async function encryptMessage() {
  const message = getMessage()
  key = await generateKey()
  iv = getNewIV()
  cipher = await encrypt(message, key, iv)
  return new Uint8Array(cipher, 0, 5)
}

// decrypts the message with the same iv and key 
// and then displays
export async function decryptMessage() {
  const output = await decrypt()  
  const decoder = new TextDecoder()
  const message = decoder.decode(output)
  return message
}