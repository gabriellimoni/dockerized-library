import iBook from '@dto/iBook'
import { Model } from 'objection'

export default class Book extends Model {
    static get tableName () {
        return 'books'
    }

    static serialize (book: iBook): any {
        return book
    }

    static deserialize (serialized: any): iBook {
        return serialized as iBook
    }
}