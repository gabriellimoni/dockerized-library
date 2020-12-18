import TokenData from '@dto/iTokenData'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '@config/auth'

export const encryptPassword = async (password: string): Promise<string> => {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
}

export const comparePassoword = async (passwordHash: string, password: string): Promise<boolean> => {
    return await bcrypt.compare(password, passwordHash)
}

export const generateToken = async (payload: object): Promise<TokenData> => {
    const expiresIn = Date.now() + (15 * 60 * 1000)
    
    const token = await jwt.sign(payload, jwtSecretKey, {
        expiresIn: '15m',
    })

    return {
        accessToken: token,
        expiresIn,
    }
}

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        jwt.verify(token, jwtSecretKey)
        return true
    } catch {
        return false
    }
}

export const decodeToken = async (token: string): Promise<any> => {
    return jwt.decode(token.replace('Bearer ', ''))
}