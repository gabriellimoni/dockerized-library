import { Request, Response } from "express"
import bookService from '@services/book.service'
import { decodeToken } from '@services/auth.service'
import * as amqpService from '@services/amqp.service'
import { MessageTypesEnum } from '@dto/iPublishMessage'
import { MessageTopicsEnum } from '@dto/iMessageTopics'
import Book from "@dto/iBook"

const createBook = async (req: Request, res: Response) => {
    const book: Book = req.body
    const decodedToken: { username: string } = await decodeToken(req.headers['x-access-token'] as string)

    const createdBook = await bookService.createBook(book)

    await amqpService.publishMessage({
        message: { ...createdBook, createdUsername: decodedToken.username },
        routingKey: '',
        topicName: MessageTopicsEnum.BOOK_CREATED,
        type: MessageTypesEnum.PUBSUB,
    })

    return res.send(createdBook)
}

const listBooks = async (req: Request, res: Response) => {
    const params = req.query
    const books = await bookService.listBookWithParams(params)
    return res.send(books)
}

export default {
    create: createBook,
    list: listBooks,
}