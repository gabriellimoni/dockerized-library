import iUser from '@dto/iUser'
import { Model } from 'objection'

export default class User extends Model {
    static get tableName () {
        return 'users'
    }

    static serialize (user: iUser): any {
        return user
    }

    static deserialize (serialized: any): iUser {
        return serialized as iUser
    }
}