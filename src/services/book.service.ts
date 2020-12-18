import Book from '@dto/iBook'
import BookListParams from '@dto/iBookListParams'
import * as bookRepository from '@repositories/book.repository'
import * as cacheService from '@services/cache.service'
import * as amqpService from '@services/amqp.service'
import { MessageTypesEnum } from '@dto/iPublishMessage'
import { MessageTopicsEnum } from '@dto/iMessageTopics'

const createBook = async (book: Book) => {
    const createdBook = bookRepository.insertBook(book)
    await amqpService.publishMessage({
        message: book,
        routingKey: '',
        topicName: MessageTopicsEnum.BOOK_CREATED,
        type: MessageTypesEnum.PUBSUB,
    })
    return createdBook
}

const listBookWithParams = async (params: BookListParams) => {
    const cache_key = `books_${JSON.stringify(params)}`
    const cached_data = await cacheService.getCache(cache_key)
    if (cached_data) return cached_data

    const books = await bookRepository.listBookWithParams(params)
    cacheService.saveCache(cache_key, books, 10)
    return books
}

export default {
    createBook,
    listBookWithParams,
}