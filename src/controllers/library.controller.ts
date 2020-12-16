import { Request, Response } from 'express'
import libraryService from '@services/library.service'
import Library from '@dto/iLibrary'

const createLibrary = async (req: Request, res: Response) => {
    const library: Library = req.body
    await libraryService.createLibrary(library)
    return res.send(library)
}

export default {
    create: createLibrary,
}