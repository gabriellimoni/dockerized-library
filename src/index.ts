import express from 'express'
import bodyParser from 'body-parser'
import { port } from './config/server'
import router from './router'
import errorInterceptor from '@middlewares/errorInterceptor.middleware'
import './database/mysql'
import * as amqpService from '@services/amqp.service'

async function main () {
    await amqpService.connect()
    
    const server = express()
    server.use(bodyParser.json())
    server.use(router)
    server.use(errorInterceptor)

    server.listen(port, () => {
        console.log('Running on port', port)
    })
}
main()