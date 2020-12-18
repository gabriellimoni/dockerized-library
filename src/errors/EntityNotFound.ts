import BaseApiError from "./BaseApiError"
import { v4 } from 'uuid'

export default class EntityNotFoundError extends BaseApiError {
    constructor (entity: string, field: string, value: string) {
        super(`${entity} not found with this ${field}: '${value}'`, 404, v4())
    }
}