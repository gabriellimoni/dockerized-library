import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'

export const createValidationMiddleware = (validations: Array<ValidationChain>) => {
    async function validateMiddleware (req: Request, res: Response, next: NextFunction) {
        await Promise.all(validations.map(validation => validation.run(req)))
    
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
    
        res.status(400).json({ errors: errors.array() })
    }

    return validateMiddleware
}
