import { TorpedoType } from "../interfaces/torpedo-type";

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
        name: "basic",
        width: 2,
        height: 0.5,
        backgroundImage: undefined,
        damage: 100,
        area: 10,
        speed: 500,
    }
]