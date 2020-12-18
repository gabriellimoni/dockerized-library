import { Request, Response } from 'express'
import libraryService from '@services/library.service'
import Library from '@dto/iLibrary'
import EntityNotFoundError from 'src/errors/EntityNotFound'
import BaseApiError from 'src/errors/BaseApiError'

const createLibrary = async (req: Request, res: Response) => {
    const library: Library = req.body
    const createdLibrary = await libraryService.createLibrary(library)
    return res.send(createdLibrary)
}

const getLibrary = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) throw new BaseApiError('Parameter ID must be a integer', 400, req.params.id)

    const library: Library | undefined = await libraryService.getLibraryById(id)
    if (!library) throw new EntityNotFoundError('Library', 'id', String(id))

    return res.send(library)
}

const listLibraries = async (req: Request, res: Response) => {
    const params = req.query
    const libraries = await libraryService.listLibraryWithParams(params)
    return res.send(libraries)
}

export default {
    create: createLibrary,
    get: getLibrary,
    list: listLibraries,
}