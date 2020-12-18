import User from "@dto/iUser"
import { encryptPassword } from '@services/auth.service'
import * as userRepository from '@repositories/user.repository'

const createUser = async (user: User) => {
    const encryptedPassword = await encryptPassword(user.password as string)
    user.password = encryptedPassword

    const createdUser = await userRepository.insertUser(user)
    
    delete createdUser?.password
    return createdUser
}

export default {
    createUser,
}