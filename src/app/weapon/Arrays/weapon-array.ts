// interfaces
import { WeaponType } from "../Interfaces/weapon-type";


export const weaponArray: WeaponType[] = [
    {
        weaponName: "DS30B 30mm Gun",
        firingRate: 10.8,
        reloadingRate: 3600,
        barrelLife: 5000,
        range: [5100, 2750],
        attackVector: ["surface", "air"],
        damage: [1, 3],
        armorPenetration: 1,
    },
    {
        weaponName: "GAM BO 20mm Gun",
        firingRate: 16.6,
        reloadingRate: 3600,
        barrelLife: 200,
        range: [2000],
        attackVector: ["air"],
        damage: [1, 3],
        armorPenetration: 1,    
    }
]

// weaponName: string,
// firingRate: number,
// reloadingRate: number,
// barrelLife: number,
// range: number[],
// attackVector: string[],