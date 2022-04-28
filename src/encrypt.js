// https://github.com/mdn/dom-examples/blob/master/web-crypto/encrypt-decrypt/aes-cbc.js
const AES_GCM = 'AES-GCM'
let key, iv, cipher, name = AES_GCM

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
  return window.crypto.subtle.encrypt({ name, iv }, key, message)
}

function decrypt() {
  console.log({ iv, key, cipher })
  return window.crypto.subtle.decrypt({ name, iv }, key, cipher )
}

function generateKey() {
  return window.crypto.subtle.generateKey({ name, length: 256 },
    true, ["encrypt", "decrypt"])
}

function generateHash(stream) {
  const array = new Array(stream)
  console.log(array)
  return array.map(b => b.toString(16).padStart(2, 0)).join('')
}

// fetches the text in a the box and encrypts it
// with the iv and value
export async function encryptMessage() {
  const message = getMessage()
  key = await generateKey()
  iv = getNewIV()
  cipher = await encrypt(message, key, iv)
  const stream = new Uint8Array(cipher)
  const decoder = new TextDecoder()
  return decoder.decode(stream)
}

// decrypts the message with the same iv and key 
// and then displays
export async function decryptMessage() {
  const output = await decrypt()  
  const decoder = new TextDecoder()
  const message = decoder.decode(output)
  return message
}