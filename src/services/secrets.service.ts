import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
const client = new SecretManagerServiceClient()

export const setSecrets = async () => {
    if (process.env.NODE_ENV === 'production') {
        
    } else {
        // use env vars from docker-composer
    }
}