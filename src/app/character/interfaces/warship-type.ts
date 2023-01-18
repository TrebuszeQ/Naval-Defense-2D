// interfaces
import { TorpedoType } from "../../torpedo/Interfaces/torpedo-type"
import { WeaponType } from "src/app/weapon/Interfaces/weapon-type"
import { Skills } from "./skills"
// components

export interface WarshipType {
    name: string,
    width: number,
    height: number,
    backgroundImagePath: string,
    description: string,
    availableWeapons: {
        weapon: WeaponType[], 
        quantity: number[]
    } | null,
    availableTorpedos: {
        torpedo: TorpedoType[],
        quantity: number[],
    } | null,
    torpedeAmount: number,
    maxSpeed: number,
    repairmentTime: number | null,
    skills: null | Skills[],
    armor: number,
    crew: number,
    warshipEndurance: number,
}

// #warship {
//   z-index: 8;
//   display: block;
//   position: absolute;
//   margin: 0;
//   padding: 0;
//   width: 12.5%;
//   height: ${maxHeight * 0.025}px;
//   background-color: rgb(101, 101, 101);
// }
