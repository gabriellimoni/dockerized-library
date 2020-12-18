import Book from '@dto/iBook'
import BookModel from '@models/mysql/book.model'
import { ForeignKeyViolationError } from 'objection'
import BookLibraryIdForeignError from 'src/errors/BookLibraryIdForeign'

export const insertBook = async (book: Book): Promise<Book | undefined> => {
    const inserted = await BookModel.transaction(async trx => {
        const serializedBook = BookModel.serialize(book)
        return await BookModel
            .query()
            .insert(serializedBook)
    }).catch(err => {
        if (err instanceof ForeignKeyViolationError) {
            if (err.constraint === 'books_library_id_foreign') {
                throw new BookLibraryIdForeignError(book.library_id)
            }
        }

        throw err
    }) as BookModel
    
    const createdBookId = inserted.$id() as number
    const createdBook = await getBookById(createdBookId)
    
    return createdBook
}

export const getBookById = async (id: number): Promise<Book | undefined> => {
    const book = await BookModel.query().findById(id)
    if (!book) return undefined

    const jsonData = BookModel.deserialize(book)
    return jsonData
}