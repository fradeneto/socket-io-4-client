import Head from 'next/head'
import { useState } from 'react';
import {io} from 'socket.io-client'
export default function Home() {
  let socket;
  const [serverUrl, setServerUrl] = useState(String(process.env.NEXT_PUBLIC_APP_URL))
  const [plateMessages, setPlateMessages] = useState([])
  const [messages, setMessages] = useState([])

  const handleConnection = () => {
    socket = io(serverUrl);
    console.log('connect', serverUrl)

    socket.on('new-plate', (data) => {
      console.log('plate', data)
      const plates = plateMessages;
      plates.push(data);
      setPlateMessages(plates);
    })

    socket.onAny((event, data) => {
      console.log(event, data)
      if (event === 'new-plate'){
        const plates = plateMessages;
        plates.push(data);
        setPlateMessages(plates);
      }
      // const msgs = messages;
      // msgs.push({
      //   event,
      //   data
      // })
      // setMessages(msgs);
    })

    
  }

  return (
    <div>
      <Head>
        <title>Socket.io v4 - Tester</title>
      </Head>

      <div>
        <input value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
        <button onClick={handleConnection}>Conectar</button>
      </div>

      <div style={{display: 'flex', flex: 1}}>
        <div style={{width: '100%', padding: 10}}>
          {plateMessages.map((plate, index) => (
            <div key={`plate-key-${index}`}>
              {JSON.stringify(plate)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
