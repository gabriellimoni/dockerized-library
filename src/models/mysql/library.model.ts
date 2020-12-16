import iLibrary from '@dto/iLibrary'
import { Model } from 'objection'

export default class Library extends Model {
    static get tableName () {
        return 'libraries'
    }

    static deserializeLibrary (library: iLibrary): any {
        return {
            name: library.name,
            city: library.address?.city,
            state: library.address?.state,
            street: library.address?.street,
            number: library.address?.number,
            latitude: library.address?.geolocation?.latitude,
            longitude: library.address?.geolocation?.longitude,
        }
    }
}