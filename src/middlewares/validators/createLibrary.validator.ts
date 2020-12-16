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
const longitude = body('address.geolocation.longitude')
    .if(_geolocation)
    .exists().withMessage('Longitude is required when passing geolocation')
    
const validations: Array<ValidationChain> = [
    name,
    city,
    state,
    latitude,
    longitude,
]

export default createValidationMiddleware(validations)