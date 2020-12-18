import Library from '@dto/iLibrary'
import * as libraryRepository from '@repositories/library.repository'

const createLibrary = async (library: Library) => {
    return libraryRepository.insertLibrary(library)
}

const getLibraryById = async (id: number) => {
    return libraryRepository.getLibraryById(id)
}

export default {
    createLibrary,
    getLibraryById,
}