// interfaces
import { Enemy } from "./enemy";

export interface EnemyStats {
    elementID: string, 
    enemyType: Enemy, 
    x: number, 
    y: number,
    endurance: number,
};
