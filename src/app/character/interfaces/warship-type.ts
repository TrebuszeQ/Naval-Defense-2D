// interfaces
import { TorpedoType } from "../interfaces/torpedo-type"
import { WeaponType } from "src/app/weapon/Interfaces/weapon-type"
// components
import { WarshipDescriptionComponent } from "../warship-description/warship-description.component"

export interface WarshipType {
    name: string,
    width: number,
    height: number,
    backgroundImagePath: string,
    description: WarshipDescriptionComponent,
    avalaibleWeapons: WeaponType[] | null,
    availableTorpedes: TorpedoType[] | null,
    torpedeAmount: number,
    maxSpeed: number,
    repairmentTime: number | null,
    skills?: undefined,
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
