import User from "@dto/iUser"
import { encryptPassword } from '@services/auth.service'
import * as userRepository from '@repositories/user.repository'
import EntityNotFoundError from "src/errors/EntityNotFound"

const createUser = async (user: User) => {
    const encryptedPassword = await encryptPassword(user.password as string)
    user.password = encryptedPassword

    const createdUser = await userRepository.insertUser(user)
    
    delete createdUser?.password
    return createdUser
}

const getPasswordHashFromUsername = async (username: string): Promise<string | undefined> => {
    const user = await userRepository.getUserFromUsername(username)
    if (!user) return undefined

    return user?.password as string
}

export default {
    createUser,
    getPasswordHashFromUsername,
}