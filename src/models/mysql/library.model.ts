import iLibrary from '@dto/iLibrary'
import { Model } from 'objection'

export default class Library extends Model {
    static get tableName () {
        return 'libraries'
    }

    static serialize (library: iLibrary): any {
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

    static deserialize (serializedData: any): iLibrary {
        return {
            name: serializedData.name,
            address: {
                city: serializedData?.city,
                state: serializedData?.state,
                street: serializedData?.street,
                number: serializedData?.number,
                geolocation: {
                    latitude: serializedData?.latitude,
                    longitude: serializedData?.longitude
                }
            }
        }
    }
}