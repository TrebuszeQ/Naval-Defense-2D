// interfaces
import { EnemyStats } from "./enemy-wrapper/Interfaces/enemy-stats";
import { WeaponType } from "./weapon/Interfaces/weapon-type";

export interface CombatItem {
    enemyStats: EnemyStats, 
    weapon: WeaponType, 
    weaponQuantity: number,
}
