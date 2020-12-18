import { promisify } from 'util'
import redis from 'redis'
const client = redis.createClient({host: process.env.REDIS_HOST})

export const saveCache = (key: string, data: object, expirationInSeconds: number) => {
    client.set(
        key, 
        JSON.stringify(data), 
        'EX', 
        expirationInSeconds, 
        () => _savedCacheCallback(key, expirationInSeconds)    
    )
}

function _savedCacheCallback (key: string, expirationInSeconds: number) {
    console.log(`cache '${key}' saved - expiration: ${expirationInSeconds}s`)
}

export const getCache = (key: string): Promise<object | undefined> => {
    return new Promise(resolve => {
        client.get(key, (err, data) => {
            if (err) {
                console.log('CACHE ERROR', err)
                return resolve(undefined)
            }
            if (!data) return resolve(undefined)

            try {
                return resolve(JSON.parse(data))
            } catch {
                return resolve(undefined)
            }
        })
    })
}
