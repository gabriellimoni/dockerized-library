import { createValidationMiddleware } from './validationUtils'
import { body, ValidationChain } from 'express-validator'

const name = body('name', 'New Library needs a name')
    .exists()
    .trim()

const _address = body('address').exists()
const city = body('address.city', 'City is required when passing address')
    .if(_address)
    .exists()
    .trim()
const state = body('address.state', 'State is required when passing address')
    .if(_address)
    .exists()
    .trim()

const _geolocation = body('address.geolocation').exists()
const latitude = body('address.geolocation.latitude')
    .if(_geolocation)
    .exists().withMessage('Latitude is required when passing geolocation')
    .isNumeric().withMessage('Latitude must be a number. Eg: -20.090902930920')
const longitude = body('address.geolocation.longitude')
    .if(_geolocation)
    .exists().withMessage('Longitude is required when passing geolocation')
    .isNumeric().withMessage('Longitude must be a number. Eg: -10.090902930920')
    
const validations: Array<ValidationChain> = [
    name,
    city,
    state,
    latitude,
    longitude,
]

export default createValidationMiddleware(validations)