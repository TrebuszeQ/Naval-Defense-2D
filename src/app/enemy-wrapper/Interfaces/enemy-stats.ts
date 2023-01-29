// interfaces
import { Subject } from "rxjs";
import { Enemy } from "./enemy";

export interface EnemyStats {
    elementID: string, 
    enemyType: Enemy, 
    x: number, 
    y: number,
    endurance: number,
};

export interface EnemyStatsSubjects {
    elementID: Subject<string>,
    enemyType: Subject<Enemy>,
    x: Subject<number>,
    y: Subject<number>, 
    endurance: Subject<number>
}