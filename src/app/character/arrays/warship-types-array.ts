import { WarshipType } from "../interfaces/warship-type";
import { torpedoTypeArray } from "./torpedo-types";

const maxHeight = window.screen.height;

export const warshipTypeArray: WarshipType[] = [
    {
        name: "basic",
        width: 12.5,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: `<center>Description</center> <br> Starting warship.`,
        availableTorpedes: [torpedoTypeArray[0]],
    },
]

// possibleTorpedes to be built

// export interface WarshipType {
//     name: string,
//     width: number,
//     height: number,
//     backgroudImage?: ImageBitmap
// }

