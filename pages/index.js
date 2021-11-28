import Head from 'next/head'
import { useState } from 'react';
import {io} from 'socket.io-client'
export default function Home() {
  let socket;
  const [serverUrl, setServerUrl] = useState(String(process.env.NEXT_PUBLIC_APP_URL))
  const [plateNew, setPlateNew] = useState()
  const [plateOld, setPlateOld] = useState()

  const handleConnection = () => {
    socket = io(serverUrl);
    console.log('connect', serverUrl)

    socket.on('new-plate', (data) => {
      console.log('plate', data)
      setPlateOld(plateNew);
      setPlateNew(data)
    })

    socket.onAny((event, data) => {
      console.log(`onAny: ${event}`, data)
      // if (event === 'new-plate'){
      //   const plates = plateMessages;
      //   plates.push(data);
      //   setPlateMessages(plates);
      // }
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
        <div style={{width: '100%', padding: 10, textAlign: 'center'}}>
          {!!plateNew && (
            <>
              <div>
                <img src={`/camera/${plateNew.filename}`} alt="" />
              </div>
              <div>
                {plateNew.plate_used}
              </div>
            </>
          )}
        </div>
        <div style={{width: '100%', padding: 10, marginTop: 20, textAlign: 'center'}}>
          {!!plateOld && (
            <>
              <div>
                <img src={`/camera/${plateOld.filename}`} alt="" />
              </div>
              <div>
                {plateOld.plate_used}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
