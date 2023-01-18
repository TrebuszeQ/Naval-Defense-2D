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
        range: [3000, 2750, 0],
        barrelLife: 5000,
        attackVector: ["surface", "air"],
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
        range: [2000, 1500, 0],
        barrelLife: 4000,
        attackVector: ["surface", "air"],
        damage: [1, 3],
        armorPenetration: 1,
        train: 360    
    },
    {
        weaponName: "General Purpose Machine Guns",
        caliber: "7.62mm",
        firingRate: 16.7,
        reloadingRate: 1800,
        muzzleVelo: 860,
        ammoCapacity: 200,
        range: [1100, 1100, 0],
        barrelLife: 15000,
        attackVector: ["surface", "air"],
        damage: [1, 3],
        armorPenetration: 0.5,
        train: 185, 
    },
    {
        weaponName: "M134 Minigun",
        caliber: "7.62mm",
        firingRate: 100,
        reloadingRate: 1800,
        muzzleVelo: 853,
        ammoCapacity: 1000,
        range: [1000, 1000, 0],
        barrelLife: 5000,
        attackVector: ["surface", "air"],
        damage: [1, 3],
        armorPenetration: 0.5,
        train: 185, 
    }
]

// weaponName: string,
// firingRate: number,
// reloadingRate: number,
// barrelLife: number,
// range: number[],
// attackVector: string[],