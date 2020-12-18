import express, { Request, Response, NextFunction } from 'express'
import libraryController from '@controllers/library.controller'
import createLibraryValidator from '@validators/createLibrary.validator'
import bookController from '@controllers/book.controller'

const router = express.Router()

router
    .post('/library', createLibraryValidator, wrapAsync(libraryController.create))
    .get('/library/:id', wrapAsync(libraryController.get))
    .post('/book', wrapAsync(bookController.create))

// let error be handled by a middleware,
// thereby the controller don't need to handle it
function wrapAsync (fn: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next)
    }
}

export default router