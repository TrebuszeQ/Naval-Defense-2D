import { TorpedoType } from "../Interfaces/torpedo-type";

// export interface TorpedoType {
//     name: string,
//     width: string,
//     height: string,
//     backgroundImage?: string | HTMLImageElement,
//     damage: number,
//     area: number
// }

export const torpedoTypeArray: TorpedoType[] = [
    {
        torpedoName: "Seafox Drone",
        length: 1.2,
        height: 0.3,
        backgroundImagePath: null,
        damage: 5,
        area: 0,
        speed: 7.4,
        limit: 1,
        loadingTime: 1800,
        range: 1200,
        navigated: true,
    }
]