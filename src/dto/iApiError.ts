export default interface ApiError {
    message: string,
    status: number,
    debugId?: string
}