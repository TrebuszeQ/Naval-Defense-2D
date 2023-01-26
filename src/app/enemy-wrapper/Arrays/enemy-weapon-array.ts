// interfaces
import { EnemyWeapon } from "../Interfaces/enemy-weapon";

export const enemyWeaponArray: EnemyWeapon[] = [
    {
        weaponName: "Low Frequency and Intensity Alien Laser Type A0",
        firingRate: 0.3,
        reloadingRate: 0,
        muzzleVelo: null,
        ammoCapacity: Infinity,
        range: [2000, 2000, 200],
        attackVector: ["surface", "air", "underwater"],
        damage: [0.2, 0.5],
        armorPenetration: 0.5,
        train: 120,
    }
];


// weaponName: string,
// firingRate: number,
// reloadingRate: number,
// muzzleVelo: number,
// ammoCapacity: number,
// range: number[],
// barrelLife: number,
// attackVector: AttackVector[],
// damage: number[],
// armorPenetration: number,
// train: number | null,

// weaponName: "DS30M Mark 2 30mm ASCG",
// caliber: "30mm",
// firingRate: 10.8,
// reloadingRate: 3600,
// muzzleVelo: 1080,
// ammoCapacity: 400,
// range: [3000, 2750, 0],
// barrelLife: 5000,
// attackVector: ["surface", "air"],
// damage: [1, 3],
// armorPenetration: 1.08,
// train: 185,