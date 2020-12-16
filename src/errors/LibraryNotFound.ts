import BaseApiError from "./BaseApiError"
import { v4 } from 'uuid'

export default class LibraryNotFoundError extends BaseApiError {
    constructor (id: number) {
        super(`Library not found with this id: '${id}'`, 404, v4())
    }
}