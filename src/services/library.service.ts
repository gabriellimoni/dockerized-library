import Library from '@dto/iLibrary'
import * as libraryRepository from '../repositories/library.repository'

const createLibrary = async (library: Library) => {
    return libraryRepository.insertLibrary(library)
}

export default {
    createLibrary,
}