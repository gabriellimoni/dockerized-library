import BaseApiError from "./BaseApiError"
import { v4 } from 'uuid'

export default class EntityFieldUniqueError extends BaseApiError {
    constructor (entity: string, field: string, value: string) {
        super(`${entity} with ${field} '${value}' already exists`, 400, v4())
    }
}