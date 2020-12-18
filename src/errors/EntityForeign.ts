import { v4 } from "uuid";
import BaseApiError from "./BaseApiError";

export default class EntityForeignError extends BaseApiError {
    constructor (entity: string, entityId: number) {
        super(`${entity} ID '${entityId}' does not exists`, 400, v4())
    }
}