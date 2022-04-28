import './App.css';
import { useState, useCallback } from 'react';
import { encryptMessage, decryptMessage } from './encrypt';

function App() {

  const [message, setMessage] = useState('waiting for message ...')

  // callback used to encrypt the message
  const onEncrypt = useCallback(async () => {
    const encrypted = await encryptMessage()
    setMessage(encrypted)
  },[setMessage])

  // callback used to decrypt the cipher
  const onDecrypt = useCallback(async () => {
    const decrypted = await decryptMessage()
    setMessage(decrypted)
  }, [setMessage])

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <div className="container">
          <input id="message" type="text" placeholder='enter your message'></input>
          <button onClick={() => onEncrypt()}>encrypt</button>
          <button onClick={() => onDecrypt()}>decrypt</button>
        </div>
      </header>
    </div>
  );
}

export default App;
