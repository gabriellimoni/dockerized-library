import { v4 } from "uuid"
import BaseApiError from "./BaseApiError"

export default class InvalidCredentialsError extends BaseApiError {
    constructor () {
        super('Invalid credentials', 400, v4())
    }
}