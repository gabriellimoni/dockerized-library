import express from 'express'
import bodyParser from 'body-parser'
import { port } from './config/server'
import router from './router'

const server = express()
server.use(bodyParser.json())
server.use(router)

server.listen(port, () => {
    console.log('Running on port', port)
})