export interface TorpedoType {
    name: string,
    width: number,
    height: number,
    backgroundImage?: string | HTMLImageElement | ImageBitmap
    damage: number,
    area: number,
    speed: number,
    limit: number,
}
