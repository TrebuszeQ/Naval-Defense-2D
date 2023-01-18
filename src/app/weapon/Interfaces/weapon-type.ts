// types
import { AttackVector } from "../Types/attack-vector";

export interface WeaponType {
    weaponName: string,
    caliber: string,
    firingRate: number,
    reloadingRate: number,
    muzzleVelo: number,
    ammoCapacity: number,
    range: number[],
    barrelLife: number,
    attackVector: AttackVector[],
    damage: number[],
    armorPenetration: number,
    train: number | null,
}
