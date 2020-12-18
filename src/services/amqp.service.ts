import amqp, { Connection } from 'amqplib'
import { connectionString } from '@config/rabbitmq'

let connection: Connection | undefined = undefined

export const connect = async () => {
    connection = await amqp.connect(connectionString)
}
