// interfaces
import { TorpedoType } from "../interfaces/torpedo-type"
import { WeaponType } from "src/app/weapon/Interfaces/weapon-type"
import { Skills } from "./skills"
// components

export interface WarshipType {
    name: string,
    width: number,
    height: number,
    backgroundImagePath: string,
    description: string,
    avalaibleWeapons: WeaponType[] | null,
    availableTorpedes: TorpedoType[] | null,
    torpedeAmount: number,
    maxSpeed: number,
    repairmentTime: number | null,
    skills: null | Skills[],
    armor: number,
    crew: number,
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
