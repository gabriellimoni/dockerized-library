import TokenData from '@dto/iTokenData'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const encryptPassword = async (password: string): Promise<string> => {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
}

export const comparePassoword = async (passwordHash: string, password: string): Promise<boolean> => {
    return await bcrypt.compare(password, passwordHash)
}

export const generateToken = async (payload: object): Promise<TokenData> => {
    const secretKey = process.env.JWT_SECRET_KEY as string
    const expiresIn = Date.now() + (15 * 60 * 1000)
    
    const token = await jwt.sign(payload, secretKey, {
        expiresIn: '15m',
    })

    return {
        accessToken: token,
        expiresIn,
    }
}