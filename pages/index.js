import Head from 'next/head'
import { useState } from 'react';
import {io} from 'socket.io-client'
import _ from 'lodash';

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
      if (!!plateNew){
        const old = _.clone(plateNew)
        setPlateOld(old);
      }
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

      <div style={{display: 'flex', flex: 1, flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flex: 1, flexDirection: 'column', width: '100%', padding: 10, textAlign: 'center'}}>
          {!!plateNew && (
            <>
              <div>
                <img src={`/camera/${plateNew.filename}`} alt="" style={{width: '100%'}} />
              </div>
              <div>
                <h1>{plateNew.plate_used}</h1>
                <h3>{JSON.stringify(plateNew.candidates_r)}</h3>
              </div>
            </>
          )}
        </div>
        <div style={{display: 'flex', flex: 1, flexDirection: 'column', width: '100%', padding: 10, marginTop: 20, textAlign: 'center'}}>
          {!!plateOld && (
            <>
              <hr/>
              <div>
                <img src={`/camera/${plateOld.filename}`} alt="" style={{width: '100%'}} />
              </div>
              <div>
                <h1>{plateOld.plate_used}</h1>
                <h3>{JSON.stringify(plateOld.candidates_r)}</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
