export default interface Library {
    id?: number,
    name: string,
    address?: {
        city: string,
        state: string,
        street?: string,
        number?: number,
        geolocation?: {
            latitude: number,
            longitude: number
        }
    },
}