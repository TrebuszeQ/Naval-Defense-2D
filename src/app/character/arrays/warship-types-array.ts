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
    {
        name: "warship2",
        width: 12.5,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: `<center>Description</center> <br> warship2.`,
        availableTorpedes: [torpedoTypeArray[0]],
    },
    {
        name: "warship3",
        width: 12.5,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: `<center>Description</center> <br> warship3.`,
        availableTorpedes: [torpedoTypeArray[0]],
    }
]


export function findWarship(name: string): WarshipType | undefined{
    return warshipTypeArray.find((warship) => {
        return warship.name == name.toLowerCase();
    });
}
// possibleTorpedes to be built

// export interface WarshipType {
//     name: string,
//     width: number,
//     height: number,
//     backgroudImage?: ImageBitmap
// }

