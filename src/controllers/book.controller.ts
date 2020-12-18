import { Request, Response } from "express"
import bookService from '@services/book.service'
import Book from "@dto/iBook"

const createBook = async (req: Request, res: Response) => {
    const book: Book = req.body
    const createdBook = await bookService.createBook(book)
    return res.send(createdBook)
}

export default {
    create: createBook,
}