// types
import { vector } from "../Types/vector";

export interface WeaponType {
    weaponName: string,
    caliber: string,
    firingRate: number,
    reloadingRate: number,
    muzzleVelo: number,
    ammoCapacity: number,
    range: {ground: number, air: number, submarine: number},
    barrelLife: number,
    attackVector: vector[],
    damage: number[],
    armorPenetration: number,
    train: number | null,
}
