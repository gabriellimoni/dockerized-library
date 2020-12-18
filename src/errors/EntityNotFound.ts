import BaseApiError from "./BaseApiError"
import { v4 } from 'uuid'

export default class EntityNotFoundError extends BaseApiError {
    constructor (entity: string, id: number) {
        super(`${entity} not found with this id: '${id}'`, 404, v4())
    }
}