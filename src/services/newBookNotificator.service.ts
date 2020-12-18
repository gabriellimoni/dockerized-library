/**
 * This should be another service, but for leaning
 * purposes, is implemented in the same...
 */

import amqp, { Channel, Connection } from 'amqplib'
import { connectionString } from '@config/rabbitmq'
import { MessageTopicsEnum } from '@dto/iMessageTopics'
import { MessageTypesEnum } from '@dto/iPublishMessage'
import { MessageQueuesEnum } from '@dto/iMessageQueues'

let connection: Connection | undefined = undefined
let channel: Channel | undefined = undefined

export const startListening = async () => {
    connection = await amqp.connect(connectionString)
    channel = await connection.createChannel()
    channel.assertExchange(MessageTopicsEnum.BOOK_CREATED, MessageTypesEnum.PUBSUB)
    const { queue } = await channel.assertQueue(MessageQueuesEnum.CREATED_BOOKS_LIST)
    await channel.bindQueue(queue, MessageTopicsEnum.BOOK_CREATED, '')

    channel.consume(queue, async message => {
        const strMessage = message?.content.toString() || '{}'
        const jsonMessage = JSON.parse(strMessage)
        console.log(jsonMessage)
        channel?.ack(message as amqp.ConsumeMessage)
    })
}
