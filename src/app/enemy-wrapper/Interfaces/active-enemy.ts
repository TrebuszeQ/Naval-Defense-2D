// rxjs
import { Subject } from "rxjs";
// interfaces
import { Enemy } from "./enemy";

export interface ActiveEnemy {
    elementID: string, 
    enemyType: Enemy, 
    x: number, 
    y: number,
    endurance: number,
};

export interface ActiveEnemySubjects {
    elementID: Subject<string>,
    enemyType: Subject<Enemy>,
    x: Subject<number>,
    y: Subject<number>, 
    endurance: Subject<number>
}