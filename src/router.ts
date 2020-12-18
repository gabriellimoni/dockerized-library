import express, { Request, Response, NextFunction } from 'express'
import libraryController from '@controllers/library.controller'
import createLibraryValidator from '@validators/createLibrary.validator'
import bookController from '@controllers/book.controller'
import userController from '@controllers/user.controller'

const router = express.Router()

router
    .post('/user', wrapAsync(userController.create))
    .post('/login', wrapAsync(userController.login))
    .get('/library', wrapAsync(libraryController.list))
    .post('/library', createLibraryValidator, wrapAsync(libraryController.create))
    .get('/library/:id', wrapAsync(libraryController.get))
    .post('/book', wrapAsync(bookController.create))
    .get('/book', wrapAsync(bookController.list))

// let error be handled by a middleware,
// thereby the controller don't need to handle it
function wrapAsync (fn: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next)
    }
}

export default router