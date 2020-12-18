import amqp, { Channel, Connection } from 'amqplib'
import { connectionString } from '@config/rabbitmq'
import PublishMessageObject from '@dto/iPublishMessage'

let connection: Connection | undefined = undefined
let channel: Channel | undefined = undefined

export const connect = async () => {
    connection = await amqp.connect(connectionString)
    channel = await connection.createChannel()
}

export const publishMessage = async (messageObject: PublishMessageObject): Promise<boolean> => {
    await assertExchange(messageObject.topicName, messageObject.type)
    const bufferedMessage = Buffer.from(JSON.stringify(messageObject.message))
    
    const published = channel?.publish(messageObject.topicName, messageObject.routingKey, bufferedMessage)
    return !!published
}

async function assertExchange (exchange: string, type: string) {
    await channel?.assertExchange(exchange, type)
}
