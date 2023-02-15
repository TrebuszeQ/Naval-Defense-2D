// interfaces
import { WarshipType } from "../interfaces/warship-type";
import { WeaponType } from "src/app/weapon/Interfaces/weapon-type";
// arrays
import { torpedoTypeArray } from "../../torpedo/Arrays/torpedo-types";
import { weaponArray } from "src/app/weapon/Arrays/weapon-array";

const maxHeight = window.screen.height;

export const warshipTypeArray: WarshipType[] = [
    {
        name: "Offshore Patrol Vessel",
        length: 79.5,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: "",
        availableWeapons:
            {
                weapon: [weaponArray[0], weaponArray[1]], 
                quantity: [2, 1],
            },
        availableTorpedos: null,
        torpedeAmount: 0,
        maxSpeed: 37,
        repairmentTime: null,
        skills: null,
        armor: 1,
        crew: 20,
        warshipEndurance: 1 * 20,
    },
    {
        name: "Fast Patrol Boat",
        length: 1.59,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: "",
        availableWeapons: 
        {
            weapon: [weaponArray[2]],
            quantity: [2]
        },
        availableTorpedos: null,
        torpedeAmount: 0,
        maxSpeed: 59,
        repairmentTime: null,
        skills: null,
        armor: 1,
        crew: 5,
        warshipEndurance: 1 * 5,
    },
    {
        name: "Mine Counter Measure Vessel",
        length: 60,
        height: maxHeight * 0.025,
        backgroundImagePath: "/assets/images/warships/HMS_Daring.jpg",
        description: "",
        availableWeapons: {
            weapon: [weaponArray[1], weaponArray[2], weaponArray[3]],
            quantity: [1, 3, 2],
        },
        availableTorpedos: {
            torpedo: [torpedoTypeArray[0]],
            quantity: [20],
        },
        torpedeAmount: 20,
        maxSpeed: 31,
        repairmentTime: null,
        skills: null,
        armor: 1,
        crew: 47,
        warshipEndurance: 1 * 47,
    },
    
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

