// type
import { AttackVector } from "src/app/weapon/Types/attack-vector";

export interface EnemyWeapon {
    weaponName: string,
    firingRate: number,
    reloadingRate: number | null,
    muzzleVelo: number | null,
    ammoCapacity: number,
    range: number[],
    attackVector: AttackVector[],
    damage: number[],
    armorPenetration: number,
    train: number | null,
}
