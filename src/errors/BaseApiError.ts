import ApiError from "@dto/iApiError"

export default class BaseApiError extends Error implements ApiError {
    status: number
    debugId: string

    constructor (message: string, status: number, debugId: string) {
        super(message)
        this.status = status
        this.debugId = debugId
    }
}
