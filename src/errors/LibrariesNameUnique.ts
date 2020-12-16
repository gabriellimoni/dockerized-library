import BaseApiError from "./BaseApiError"
import { v4 } from 'uuid'

export default class LibraryNameUniqueError extends BaseApiError {
    constructor (name: string) {
        super(`A library with the name '${name}' already exists`, 400, v4())
    }
}