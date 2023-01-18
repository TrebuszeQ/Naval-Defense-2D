export interface TorpedoType {
    torpedoName: string,
    length: number,
    height: number,
    backgroundImagePath: string | null,
    damage: number,
    area: number,
    speed: number,
    limit: number,
    loadingTime: number,
    range: number,
    navigated: boolean,
}
