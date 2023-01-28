// interfaces
import { WeaponType } from "../Interfaces/weapon-type";


export const weaponArray: WeaponType[] = [
    {
        weaponName: "DS30M Mark 2 30mm ASCG",
        caliber: "30mm",
        firingRate: 10.8,
        reloadingRate: 3600,
        muzzleVelo: 1080,
        ammoCapacity: 400,
        range: {ground: 3000, air: 2750, submarine: 0},
        barrelLife: 5000,
        attackVector: ["ground", "air"],
        damage: [1, 3],
        armorPenetration: 1.08,
        train: 185,
    },
    {
        weaponName: "Oerlikon 20mm/85 KAA gun system",
        caliber: "20mm",
        firingRate: 16.7,
        reloadingRate: 3600,
        muzzleVelo: 1050,
        ammoCapacity: 200,
        range: {ground: 2000, air: 1500, submarine: 0},
        barrelLife: 4000,
        attackVector: ["ground", "air"],
        damage: [1, 3],
        armorPenetration: 1.05,
        train: 360    
    },
    {
        weaponName: "General Purpose Machine Guns",
        caliber: "7.62mm",
        firingRate: 16.7,
        reloadingRate: 1800,
        muzzleVelo: 860,
        ammoCapacity: 200,
        range: {ground: 1100, air: 1100, submarine: 0},
        barrelLife: 15000,
        attackVector: ["ground", "air"],
        damage: [1, 3],
        armorPenetration: 0.86,
        train: 185, 
    },
    {
        weaponName: "M134 Minigun",
        caliber: "7.62mm",
        firingRate: 100,
        reloadingRate: 1800,
        muzzleVelo: 853,
        ammoCapacity: 1000,
        range: {ground: 1000, air: 1000, submarine: 0},
        barrelLife: 5000,
        attackVector: ["ground", "air"],
        damage: [1, 3],
        armorPenetration: 0.853,
        train: 185, 
    }
]

// weaponName: string,
// firingRate: number,
// reloadingRate: number,
// barrelLife: number,
// range: number[],
// attackVector: string[],