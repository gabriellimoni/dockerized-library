import express, { Request, Response, NextFunction } from 'express'
import libraryController from '@controllers/library.controller'
import createLibraryValidator from '@validators/createLibrary.validator'

const router = express.Router()

router
    .post('/library', createLibraryValidator, wrapAsync(libraryController.create))

// let error be handled by a middleware,
// thereby the controller don't need to handle it
function wrapAsync (fn: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next)
    }
}

export default router