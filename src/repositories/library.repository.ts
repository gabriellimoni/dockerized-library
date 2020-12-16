import Library from "@dto/iLibrary"
import { UniqueViolationError } from "objection"
import LibraryNameUniqueError from "src/errors/LibrariesNameUnique"
import LibraryModel from '../models/mysql/library.model'

export const insertLibrary = async (library: Library): Promise<Library> => {
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
    }) as LibraryModel
    
    library.id = inserted.$id()

    return library
}