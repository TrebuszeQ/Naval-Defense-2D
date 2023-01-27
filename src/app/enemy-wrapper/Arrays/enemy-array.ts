// interfaces
import { Enemy } from "../Interfaces/enemy";
import { enemyWeaponArray } from "./enemy-weapon-array";
import { EnemySkills } from "../Interfaces/enemy-skills";

// types
import { enemyClass } from "../Interfaces/enemy";

export const enemyArray: Enemy[] = [
    {
        enemyName: "Alien Patrol Object",
        length: 20,
        height: 10,
        backgroundImagePath: null,
        description: `Alien Patrol Object. Equipped with 2 Low Frequency and Intensity Alien Lasers Type A0`,
        enemyClass: "ground",
        endurance: 100,
        armor: 0.5,
        maxSpeed: 30,
        enemyWeapons: {
            weapon: enemyWeaponArray[0],
            quantity: 2,
        },
        enemySkills: null,
        attacksWarship: false, 
        cssStyles: "enemy hooverableObject",
        cssMainStyleName: "alienPatrolObject",
    }   
]