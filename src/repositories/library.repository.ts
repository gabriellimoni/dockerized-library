import Library from "@dto/iLibrary"
import { UniqueViolationError } from "objection"
import BaseApiError from "src/errors/BaseApiError"
import LibraryNameUniqueError from "src/errors/LibrariesNameUnique"
import LibraryModel from '../models/mysql/library.model'

export const insertLibrary = async (library: Library): Promise<Library | undefined> => {
    const inserted = await LibraryModel.transaction(async trx => {
        const serializedLibrary = LibraryModel.serializeLibrary(library)
        return await LibraryModel
            .query(trx)
            .insert(serializedLibrary)
    }).catch(err => {
        if (err instanceof UniqueViolationError) {
            if (err.constraint === 'libraries.libraries_name_unique') {
                throw new LibraryNameUniqueError(library.name)
            }
        }
        throw err
    }) as LibraryModel
    
    const createdLibraryId = inserted.$id() as number
    const createdLibrary = await getLibraryById(createdLibraryId)
    console.log(createdLibrary)

    return createdLibrary
}

export const getLibraryById = async (id: number): Promise<Library|undefined> => {
    const library = await LibraryModel.query().findById(id)
    if (!library) return undefined

    const jsonData = LibraryModel.deserializeLibrary(library)
    return jsonData
}