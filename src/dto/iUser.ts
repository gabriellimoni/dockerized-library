export default interface User {
    id?: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password?: string,
    role_id: number,
}