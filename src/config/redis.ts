export const host: string = process.env.REDIS_HOST as string
export const port: number = parseInt(process.env.REDIS_PORT as string)
export const password: string = process.env.REDIS_PASSWORD as string