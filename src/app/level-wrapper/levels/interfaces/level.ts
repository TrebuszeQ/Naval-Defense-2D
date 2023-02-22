import { Enemy } from "src/app/enemy-wrapper/Interfaces/enemy"

export type levelScrenario = {
    wave: number,
    enemyArray: Enemy[], 
    quantity: number[]
};

export interface Level {
    name: string,
    difficulty: number,
    description: string,
    componentName: string,
    backgroundImagePath: string,
    startingDate: Date,
    startingPosition: number,
    resources: number,
    infrastructureEndurance: number,
    enemies: Enemy[];
    levelScenario: levelScrenario[]
    effectsScenario: {
        timeArray: number[],
        effect: [],
        quantity: number[],
    } | null,
    timeLength: number,
    interval: number,
};
