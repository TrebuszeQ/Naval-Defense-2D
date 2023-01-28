// type
import { vector } from "src/app/weapon/Types/vector";

export interface EnemyWeapon {
    weaponName: string,
    firingRate: number,
    reloadingRate: number | null,
    muzzleVelo: number | null,
    ammoCapacity: number,
    range: number[],
    attackVector: vector[],
    damage: number[],
    armorPenetration: number,
    train: number | null,
}
