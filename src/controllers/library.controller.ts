import { Request, Response } from 'express'

const createLibrary = async (req: Request, res: Response) => {
    return res.send(req.body)
}

export default {
    create: createLibrary,
}