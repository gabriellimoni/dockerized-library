import Book from '@dto/iBook'
import * as bookRepository from '@repositories/book.repository'

const createBook = async (book: Book) => {
    return bookRepository.insertBook(book)
}

export default {
    createBook,
}