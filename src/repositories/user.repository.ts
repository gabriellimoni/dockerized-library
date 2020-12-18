import User from "@dto/iUser"
import UserModel from '@models/mysql/user.model'
import { ForeignKeyViolationError, UniqueViolationError } from "objection"
import LibraryNameUniqueError from "src/errors/EntityFieldUnique"
import EntityForeignError from "src/errors/EntityForeign"

export const insertUser = async (user: User): Promise<User | undefined> => {
    const inserted = await UserModel.transaction(async trx => {
        const serializedUser = UserModel.serialize(user)
        return await UserModel
            .query()
            .insert(serializedUser)
    }).catch(err => {
        if (err instanceof Error) return handleInsertUserError(err, user)

        throw err
    }) as UserModel

    const createdUserId = inserted.$id() as number
    user.id = createdUserId
    
    return user
}

function handleInsertUserError (err: Error, user: User) {
    if (err instanceof ForeignKeyViolationError) {
        if (err.constraint === 'users_role_id_foreign') {
            throw new EntityForeignError('Role', user.role_id)
        }
    }

    if (err instanceof UniqueViolationError) {
        switch (err.constraint) {
            case 'users.users_username_unique':
                throw new LibraryNameUniqueError('User', 'username', user.username)
            case 'users.users_email_unique':
                throw new LibraryNameUniqueError('User', 'email', user.email)
        }
    }

    throw err
}

export const getUserFromUsername = async (username: string): Promise<User | undefined> => {
    const resultData = await UserModel.query().findOne('username', username)
    const deserializedUser = UserModel.deserialize(resultData)
    return deserializedUser
}