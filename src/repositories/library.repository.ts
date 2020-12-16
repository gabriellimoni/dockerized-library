import Library from "@dto/iLibrary"
import LibraryModel from '../models/mysql/library.model'

export const getLibraryByName = async (name: string): Promise<Library> => {
    return {} as Library
}

export const insertLibrary = async (library: Library): Promise<Library> => {
    // todo- handle errors
    const inserted = await LibraryModel.transaction(async trx => {
        const deserializedLibrary = LibraryModel.deserializeLibrary(library)
        await LibraryModel
            .query(trx)
            .insert(deserializedLibrary)
            .catch(console.log)
    }).catch(err => console.log(err))
    
    console.log(inserted)

    return library
}