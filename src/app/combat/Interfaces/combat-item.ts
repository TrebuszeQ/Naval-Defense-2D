// interfaces
import { EnemyStats } from "../../enemy-wrapper/Interfaces/active-enemy";
import { WeaponType } from "../../weapon/Interfaces/weapon-type";

export interface WarshipCombatItem {
    enemyStats: EnemyStats, 
    weapon: WeaponType, 
    weaponQuantity: number,
}
