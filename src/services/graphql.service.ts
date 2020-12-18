import libraryService from '@services/library.service'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import bookService from './book.service'

const schema = buildSchema(`
    type Query {
        library(id: ID): Library
    }

    type Library {
        id: ID
        name: String
        address: Address
        books: [Book]
    }

    type Address {
        city: String
        state: String
        street: String
        number: Int
        geolocation: Geolocation
    }

    type Geolocation {
        latitude: String
        longitude: String
    }

    type Book {
        id: ID
        name: String
        edition: String
        year: Int
    }
`)

const root = { 
    library: async (args: any) => {
        const id = args.id as number
        const library: any = await libraryService.getLibraryById(id)
        const books = await bookService.listBookWithParams({ library_id: id })
        library.books = books
        return library
    },
}

export default graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})