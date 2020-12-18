import { v4 } from "uuid";
import BaseApiError from "./BaseApiError";

export default class BookLibraryIdForeignError extends BaseApiError {
    constructor (libraryId: number) {
        super(`Library ID '${libraryId}' does not exists`, 400, v4())
    }
}