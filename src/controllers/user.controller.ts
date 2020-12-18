import { Request, Response } from "express"
import userService from '@services/user.service'
import User from "@dto/iUser"

const createUser = async (req: Request, res: Response) => {
    const user: User = req.body
    const createdUser = await userService.createUser(user)
    return res.send(createdUser)
}

export default {
    create: createUser,
}