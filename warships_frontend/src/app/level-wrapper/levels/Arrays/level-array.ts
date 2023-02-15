// interfaces
import { Level } from "../interfaces/level";
// arrays
import { enemyArray } from "src/app/enemy-wrapper/Arrays/enemy-array";

export const levelArray: Level[] = [
    {
        name: "North Atlantic Ocean Submarine Datacenter",
        difficulty: 1,
        description: `<center>DESCRIPTION</center> <br> Defend submarine datacenter before aliens cut you out of Internet!`,
        componentName: "first-level",
        backgroundImagePath: "/assets/images/levels/SargassoSea-1-1200x600.jpg",
        startingDate: new Date('August 19, 2023 08:00:00'),
        startingPosition: 60,
        resources: 100,
        infrastructureEndurance: 10000,
        enemies: [enemyArray[0]],
        levelScenario: [
            {wave: 1, enemyArray: [enemyArray[0]], quantity: [1]}, 
            {wave: 2, enemyArray: [enemyArray[0]], quantity: [1]},
            {wave: 3, enemyArray: [enemyArray[0]], quantity: [1]},
            {wave: 4, enemyArray: [enemyArray[0]], quantity: [1]},
            {wave: 5, enemyArray: [enemyArray[0]], quantity: [1]},
        ],
        effectsScenario: null,
        timeLength: 300000,
        interval: 30000/2,
    },
]

// name: string,
// difficulty: number,
// description: string,
// componentName: string,
// backgroundImagePath: string,
// startingDate: Date,
// startingPosition: number,
// resources: number,
// infrastructureEndurance: number,
// levelScenario: [{
//     time: number,
//     enemyArray: Enemy[],
//     quantity: number[],
// }]
// effectsScenario: {
//     timeArray: number[],
//     effect: [],
//     quantity: number[],
// } | null,
// timeLength: number,
// }