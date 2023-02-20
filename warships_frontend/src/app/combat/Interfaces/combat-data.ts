// interfaces
import { ActiveEnemy } from "../../enemy-wrapper/Interfaces/active-enemy";
import { WeaponType } from "../../weapon/Interfaces/weapon-type";

export interface WarshipCombatData {
    activeEnemy: ActiveEnemy, 
    weapon: WeaponType, 
    weaponQuantity: number,
}
