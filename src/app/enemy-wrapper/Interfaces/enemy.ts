// interfaces
import { EnemySkills } from "./enemy-skills";
import { EnemyWeapon } from "./enemy-weapon";
// types
import { vector } from "src/app/weapon/Types/vector";

export interface Enemy {
    enemyName: string,
    length: number,
    height: number,
    backgroundImagePath: string | null,
    description: string,
    enemyClass: vector,
    endurance: number,
    armor: number,
    maxSpeed: number,
    enemyWeapons: {
        weapon: EnemyWeapon,
        quantity: number
    } | null
    enemySkills: EnemySkills | null,
    attacksWarship: boolean, 
    cssStyles: string,
    cssMainStyleName: string,
}