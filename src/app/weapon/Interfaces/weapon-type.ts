// types
import { AttackVector } from "../Types/attack-vector";

export interface WeaponType {
    weaponName: string,
    firingRate: number,
    reloadingRate: number,
    barrelLife: number,
    range: number[],
    attackVector: AttackVector[],
    damage: number[],
    armorPenetration: number,
}
