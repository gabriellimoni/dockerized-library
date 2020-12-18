import Library from '@dto/iLibrary'
import LibraryListParams from '@dto/iLibraryListParams'
import * as libraryRepository from '@repositories/library.repository'

const createLibrary = async (library: Library) => {
    return libraryRepository.insertLibrary(library)
}

const getLibraryById = async (id: number) => {
    return libraryRepository.getLibraryById(id)
}

const listLibraryWithParams = async (params: LibraryListParams) => {
    return libraryRepository.listLibraryWithParams(params)
}

export default {
    createLibrary,
    getLibraryById,
    listLibraryWithParams,
}