import { Request, Response } from "express"
import userService from '@services/user.service'
import { comparePassoword, generateToken } from '@services/auth.service'
import User from "@dto/iUser"
import LoginData from "@dto/iLoginData"
import InvalidCredentialsError from "src/errors/InvalidCredentials"

const createUser = async (req: Request, res: Response) => {
    const user: User = req.body
    const createdUser = await userService.createUser(user)
    return res.send(createdUser)
}

const login = async (req: Request, res: Response) => {
    const loginData: LoginData = req.body
    
    const passwordHash = await userService.getPasswordHashFromUsername(loginData.username)
    if (!passwordHash) throw new InvalidCredentialsError()

    const authenticated = await comparePassoword(passwordHash, loginData.password)
    if (!authenticated) throw new InvalidCredentialsError()

    const tokenData = await generateToken({
        username: loginData.username
    })

    return res.send(tokenData)
}

export default {
    create: createUser,
    login,
}