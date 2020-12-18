export enum MessageTypesEnum {
    PUBSUB = 'fanout',
}

export default interface PublishMessageObject {
    type: MessageTypesEnum,
    topicName: string,
    routingKey: string,
    message: object,
}