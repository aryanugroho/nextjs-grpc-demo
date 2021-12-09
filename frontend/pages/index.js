import Head from 'next/head'
import { HelloRequest, HelloReply } from './../helloworld_pb'
import { GreeterClient, ServiceError } from './../helloworld_pb_service'
import { grpc } from '@improbable-eng/grpc-web'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

const helloService = new GreeterClient('http://127.0.0.1', {
  transport: NodeHttpTransport()
})

export async function getServerSideProps(context) {
  const requestMessage = new HelloRequest()
  requestMessage.setName("from SSR")

  helloService.sayHello(requestMessage, {}, function(err, response) {
      if (err != null) {
          console.log('code: %d, message: %s.', err.code, err.message)
      } else if (response !== null && err == null) {
          console.log('message: %s.', response.getMessage())
      }
  })
  return {
    props: {},
  }
}


function fireClientSide(){
  const requestMessage = new HelloRequest()
  requestMessage.setName("from client side")

  helloService.sayHello(requestMessage, {}, function(err, response) {
      if (err != null) {
          console.log('code: %d, message: %s.', err.code, err.message)
      } else if (response !== null && err == null) {
          console.log('message: %s.', response.getMessage())
      }
  })
}


export default function Home({data}) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <button onClick={fireClientSide}>Fire Client Side</button>
        
      </main>

    
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
