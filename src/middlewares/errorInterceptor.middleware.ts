import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import BaseApiError from 'src/errors/BaseApiError'

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseApiError) {
        return res.status(err.status).send({
            message: err.message,
            debugId: err.debugId,
        })
    }

    return res.status(500).send('Internal server error')
}