import { WarshipType } from "../interfaces/warship-type";

const maxHeight = window.screen.height;

export const warshipTypeArray: WarshipType[] = [
    {
        name: "basic",
        width: "12.5%",
        height: `${maxHeight * 0.025}px`,
        backgroundImage: undefined,
    },
]

// export interface WarshipType {
//     name: string,
//     width: number,
//     height: number,
//     backgroudImage?: ImageBitmap
// }