import { NextFunction, Request, Response } from "express"
import * as authService from '@services/auth.service'
import BaseApiError from "src/errors/BaseApiError"
import { v4 } from "uuid"

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string
    if (!token) throw new BaseApiError('Missing X-Access-Token', 403, v4())

    const [bearer, tokenData] = token.split(' ')
    if (!bearer || !tokenData || bearer !== 'Bearer') throw new BaseApiError('Token malformatted', 403, v4())

    const isValid = await authService.verifyToken(tokenData)
    if (!isValid) throw new BaseApiError('Invalid token', 401, v4())

    next()
}