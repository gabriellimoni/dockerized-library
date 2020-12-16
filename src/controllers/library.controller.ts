import { Request, Response } from 'express'
import libraryService from '@services/library.service'
import Library from '@dto/iLibrary'
import LibraryNotFoundError from 'src/errors/LibraryNotFound'
import BaseApiError from 'src/errors/BaseApiError'

const createLibrary = async (req: Request, res: Response) => {
    const library: Library = req.body
    await libraryService.createLibrary(library)
    return res.send(library)
}

const getLibrary = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) throw new BaseApiError('Parameter ID must be a integer', 400, req.params.id)

    const library: Library | undefined = await libraryService.getLibraryById(id)
    if (!library) throw new LibraryNotFoundError(id)

    return res.send(library)
}

export default {
    create: createLibrary,
    get: getLibrary,
}