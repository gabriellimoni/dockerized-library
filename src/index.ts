import express from 'express'
import { port } from './config/server'

const server = express()
server.get('/', async (req,res) => {
    res.send('Hello world')
})

server.listen(port, () => {
    console.log('Running on port', port)
})