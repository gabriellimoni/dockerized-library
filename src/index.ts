if (process.env.NODE_ENV === 'production') require('module-alias/register')

import express from 'express'
import bodyParser from 'body-parser'
import { port } from './config/server'
import router from './router'
import errorInterceptor from '@middlewares/errorInterceptor.middleware'
import './database/mysql'
import * as amqpService from '@services/amqp.service'
import * as newBookNotificatorService from '@services/newBookNotificator.service'
import * as secretsService from '@services/secrets.service'
import graphqlService from '@services/graphql.service'

async function main () {
    await secretsService.setSecrets()
    await amqpService.connect()
    await newBookNotificatorService.startListening()
    
    const server = express()
    server.use('/graphql', graphqlService)
    server.use(bodyParser.json())
    server.use(router)
    server.use(errorInterceptor)

    server.listen(port, () => {
        console.log('Running on port', port)
    })
}
main()