import Library from '@dto/iLibrary'
import LibraryListParams from '@dto/iLibraryListParams'
import * as libraryRepository from '@repositories/library.repository'
import * as cacheService from '@services/cache.service'

const createLibrary = async (library: Library) => {
    return libraryRepository.insertLibrary(library)
}

const getLibraryById = async (id: number) => {
    return libraryRepository.getLibraryById(id)
}

const listLibraryWithParams = async (params: LibraryListParams) => {
    const cache_key = `libraries_${JSON.stringify(params)}`
    const cached_data = await cacheService.getCache(cache_key)
    if (cached_data) return cached_data

    const libraries = await libraryRepository.listLibraryWithParams(params)
    cacheService.saveCache(cache_key, libraries, 10)
    return libraries
}

export default {
    createLibrary,
    getLibraryById,
    listLibraryWithParams,
}