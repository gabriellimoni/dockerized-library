import Book from '@dto/iBook'
import BookListParams from '@dto/iBookListParams'
import BookModel from '@models/mysql/book.model'
import { ForeignKeyViolationError } from 'objection'
import EntityForeignError from '@errors/EntityForeign'

export const insertBook = async (book: Book): Promise<Book | undefined> => {
    const inserted = await BookModel.transaction(async trx => {
        const serializedBook = BookModel.serialize(book)
        return await BookModel
            .query()
            .insert(serializedBook)
    }).catch(err => {
        if (err instanceof ForeignKeyViolationError) {
            if (err.constraint === 'books_library_id_foreign') {
                throw new EntityForeignError('Library', book.library_id)
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

export const listBookWithParams = async (params: BookListParams): Promise<Array<Book | undefined>> => {
    const query = BookModel.query()

    if (params.name) query.where('name', params.name)
    if (params.edition) query.where('edition', params.edition)
    if (params.year) query.where('year', params.year)
    if (params.library_id) query.where('library_id', params.library_id)
    
    const resultData = await query.execute()
    const deserializedData = resultData.map(BookModel.deserialize)

    return deserializedData
}
