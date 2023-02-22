/// <reference lib="webworker" />
// rxJs
import { Subject } from "rxjs";
// interfaces
import { ActiveEnemy } from "src/app/enemy-wrapper/Interfaces/active-enemy";
import { WeaponType } from "src/app/weapon/Interfaces/weapon-type";
import { WarshipCombatData } from "../Interfaces/combat-data";
import { WarshipType } from "src/app/character/interfaces/warship-type";
// services
import { EnemyStatsService } from "src/app/enemy-wrapper/Services/enemy-stats.service";

// class AutomaticCombatWorker {

//   resolutionMessage: string = "resolved";
//   activeEnemyArray: ActiveEnemy[] = [];
//   warshipCombatArray: WarshipCombatData[] = [];
//   warshipCombatArraySubject: Subject <WarshipCombatData>[] = [];
//   warshipType: WarshipType | null = null;


//   constructor(private enemyStatsService: EnemyStatsService) {}


//   async startAutomaticCombat(): Promise<string> {
//     let automaticCheckDistances = setInterval(async () => {});
//     let weapons: {weapon: WeaponType, quantity: number}[];
  
  
//     if(this.activeEnemyArray != null || this.activeEnemyArray != 0) {
//       const activeEnemyArraySorted = this.activeEnemyArray.sort((a: ActiveEnemy, b: ActiveEnemy) => {
//         return a.distance - b.distance;
//       });
  
//       automaticCheckDistances = setInterval(async () => {
//         if(this.warshipCombatArray.length == 0) {
//           // weapons = this.warshipType!.availableWeapons!;
//         } 
//         else {
//           let counter = 0;
//           weapons = await this.selectFreeWeaponAuto2(); 
//           for(let weaponObj of weapons) {
//             let activeEnemy: ActiveEnemy = activeEnemyArraySorted[counter];
//             const hasVector: boolean = await this.doWeaponHasVectorAuto2(activeEnemy, weaponObj.weapon);
//             if(hasVector == true) {
//               let warshipCombatData: WarshipCombatData = {activeEnemy: activeEnemy, weapon: weaponObj.weapon, weaponQuantity: weaponObj.quantity};
//               const isInRange = this.isEnemyInRangeAuto2(activeEnemy, weaponObj.weapon);
//               await this.appendCombatArrayAuto2(warshipCombatData);
//               await this.maintainCombat(warshipCombatData);
//             }
//           }
//         }
//       }, 1000);
      
      
//     }
  
//     return Promise.resolve(this.resolutionMessage);
//   }
// }

addEventListener('message', () => {
  const response = `worker started counting`;
  interval;
  postMessage(response);
});

let i = 0;

const interval = setInterval(() => {
  console.log(i++);
}, 1000);

