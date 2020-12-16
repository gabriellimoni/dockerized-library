import express from 'express'
import libraryController from '@controllers/library.controller'
import createLibraryValidator from '@validators/createLibrary.validator'

const router = express.Router()

router
    .post('/library', createLibraryValidator, libraryController.create)

export default router