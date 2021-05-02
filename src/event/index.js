import EventEmitter from 'events'
import mq from './mq'
import eventMail from './mail'

const myEmitter = new EventEmitter()

myEmitter.on('MQ', mq)
myEmitter.on('Mail', eventMail)

export default myEmitter
