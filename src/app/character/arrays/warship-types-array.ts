// interfaces
import { WarshipType } from "../interfaces/warship-type";
import { WeaponType } from "src/app/weapon/Interfaces/weapon-type";
// arrays
import { torpedoTypeArray } from "./torpedo-types";
import { weaponArray } from "src/app/weapon/Arrays/weapon-array";

const maxHeight = window.screen.height;

export const warshipTypeArray: WarshipType[] = [
    {
        name: "River-class offshore patrol vessel",
        width: 79.5,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: "",
        avalaibleWeapons: [weaponArray[0], weaponArray[1]],
        availableTorpedes: null,
        torpedeAmount: 0,
        maxSpeed: 37,
        repairmentTime: null,
        skills: null,
        armor: 1,
        crew: 20,
    },
    {
        name: "warship2",
        width: 7.95,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: "",
        avalaibleWeapons: [weaponArray[0], weaponArray[1]],
        availableTorpedes: null,
        torpedeAmount: 0,
        maxSpeed: 0.77,
        repairmentTime: null,
        skills: null,
        armor: 1,
        crew: 20,
    },
    {
        name: "warship3",
        width: 7.95,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: "",
        avalaibleWeapons: [weaponArray[0], weaponArray[1]],
        availableTorpedes: null,
        torpedeAmount: 0,
        maxSpeed: 0.77,
        repairmentTime: null,
        skills: null,
        armor: 1,
        crew: 20,
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
//     backgroundImagePath: string,
//     description: string,
//     availableTorpedes: TorpedoType[],
//     torpedeAmount: number,
//     maxSpeed: number,
//     reloadingTime: number,
//     repairmentTIme: number,
//     skills?: undefined,
//     armor: number,
//     crew: number,
// }

