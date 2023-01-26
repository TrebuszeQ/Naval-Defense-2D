// interfaces
import { EnemySkills } from "./enemy-skills";
import { EnemyWeapon } from "./enemy-weapon";

export type enemyClass = "ground" | "air" | "submarine";

export interface Enemy {
    enemyName: string,
    length: number,
    height: number,
    backgroundImagePath: string | null,
    description: string,
    enemyClass: enemyClass,
    endurance: number,
    armor: number,
    maxSpeed: number,
    enemyWeapons: {
        weapon: EnemyWeapon,
        quantity: number
    } | null
    enemySkills: EnemySkills | null,
    attacksWarship: boolean, 
}