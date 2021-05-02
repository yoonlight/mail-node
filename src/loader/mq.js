import amqp from 'amqplib'
import myEmitter from '../event'
async function mqLoad() {
  const q = 'mail'
  const open = amqp.connect(process.env.MQ_URL)

  try {
    const conn = await open
    const ch = await conn.createChannel()
    let ok = ch.assertQueue(q, { durable: false })
    ok = ok.then(() => {
      return ch.consume(q, function (msg) {
        if (msg !== null) {
          const message = msg.content.toString()
          console.log(' [x] %s', message)
          myEmitter.emit('Mail', message)
          ch.ack(msg)
        }
      })
    })
    return ok.then(() => {
      console.log(' [*] Waiting for logs. To exit press CTRL+C')
    })
  } catch (error) {
    console.warn(error)
  }
}

export default mqLoad
