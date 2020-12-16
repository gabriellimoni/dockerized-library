import express from 'express'
import bodyParser from 'body-parser'
import { port } from './config/server'

const server = express()
server.use(bodyParser.json())

server.listen(port, () => {
    console.log('Running on port', port)
})