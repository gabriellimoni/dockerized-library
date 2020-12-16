import express from 'express'
import libraryController from './controllers/library.controller'

const router = express.Router()

router
    .post('/library', libraryController.create)

export default router