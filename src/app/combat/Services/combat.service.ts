import { Injectable } from '@angular/core';
// interfaces
import { WarshipType } from 'src/app/character/interfaces/warship-type';
import { Enemy } from 'src/app/enemy-wrapper/Interfaces/enemy';
import { TorpedoType } from 'src/app/torpedo/Interfaces/torpedo-type';
import { WeaponType } from 'src/app/weapon/Interfaces/weapon-type';
import { ActiveEnemy } from 'src/app/enemy-wrapper/Interfaces/active-enemy';
import { WarshipCombatData } from '../Interfaces/combat-data';
// services
import { WarshipPositionService } from 'src/app/character/services/warship-position.service';
import { WarshipTypeService } from 'src/app/character/services/warship-type.service';
import { WeaponService } from 'src/app/weapon/Services/weapon.service';
import { EnemyStatsService } from 'src/app/enemy-wrapper/Services/enemy-stats.service';
import { EnemyCounterService } from 'src/app/enemy-wrapper/Services/enemy-counter.service';
import { TorpedoService } from 'src/app/torpedo/Services/torpedo.service';
import { TorpedoTrajectoryService } from 'src/app/torpedo/Services/torpedo-trajectory.service';
import { TorpedoTypeService } from 'src/app/torpedo/Services/torpedo-type.service';
import { TorpedoEffectsService } from 'src/app/torpedo/Services/torpedo-effects.service';
import { RightUiLogService } from 'src/app/level-wrapper/levels/Services/rightui-log.service';
// types
import { vector } from 'src/app/weapon/Types/vector';
// rxjs
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CombatService {

  resolutionMessage: string = "resolved";
  logFeedback: string = '';
  warshipType: WarshipType | null =null;
  warshipX: number = 0;
  selectedWeapon: WeaponType | null = null;
  selectedActiveEnemy: ActiveEnemy | null = null;
  torpedo: TorpedoType | null = null;
  warshipCombatArray: WarshipCombatData[] = [];
  warshipCombatArraySubject: Subject <WarshipCombatData>[] = [];
  activeEnemyArray: ActiveEnemy[] = [];
  firingInterval: null | NodeJS.Timer = null;

  constructor(private warshipTypeService: WarshipTypeService, private warshipPositionService: WarshipPositionService, private weaponService: WeaponService, private enemyPositionService: EnemyStatsService, private enemyCounterService: EnemyCounterService, private torpedoService: TorpedoService, private torpedoTypeService: TorpedoTypeService, private torpedoTrajectoryService: TorpedoTrajectoryService, private torpedoEffectsService: TorpedoEffectsService, private rightUiLogService: RightUiLogService, private enemyStatsService: EnemyStatsService) { 
    this.getWarshipType();
    this.getStartingWarshipX();
    this.getWarshipPositionSubject();
    this.getWeaponSubject();
    this.getSelectedActiveEnemySubject();
  }

  async appendRightUiLogFeedback(): Promise<string> {
    this.rightUiLogService.updateRightUiLog(this.logFeedback);

    this.logFeedback = '';
    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipType() {
    const warshipTypeObserver = {
      next: (warshipType: WarshipType) => { 
        this.warshipType = warshipType;
      },
      error: (error: Error) => `warshipTypeObserver on combat.service encountered an error ${error}.`,
      // complete: () => console.log("warshipTypeObserver received complete"),
    }
    
    this.warshipTypeService.getSelectedWarshipType().subscribe(warshipTypeObserver).unsubscribe();

    return Promise.resolve(this.resolutionMessage);
  }

  async getStartingWarshipX(): Promise<string> {
    const getStartingWarshipXObserver = { 
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      },
      error: (error: Error) => {
        console.error(`getStartingWarshipX on character.component encountered an error: ${error}`);
      },
    };
    this.warshipPositionService.getStartingWarshipX().subscribe(getStartingWarshipXObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipPositionSubject(): Promise <string>{
    this.warshipPositionService.warshipXSubject.subscribe({
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      }
    });
    
    return Promise.resolve(this.resolutionMessage);
  }

  async getWeaponSubject(): Promise<string> {
    this.weaponService.currentWeaponSubject.subscribe({
      next: (weapon: WeaponType) => {
        this.selectedWeapon = weapon;
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }

  // async calculateDistance(activeEnemy: ActiveEnemy): Promise<number> {
  //   let distance: number = activeEnemy.x - this.warshipX!;
  //   if(distance < 0) {
  //     distance *= -1;
  //   };
    
  //   return Promise.resolve(distance);
  // }

  // async getActiveEnemyArraySubject(): Promise<string> {
  //   const activeEnemyArraySubject = this.enemyStatsService.activeEnemyArraySubject;
  //   for(let enemy of activeEnemyArraySubject) {
  //     enemy.subscribe({
  //       next: (activeEnemy: ActiveEnemy) {
  //         this.activeEnemyArray[]
  //       }
  //     })
  //   }

  //   return Promise.resolve(this.resolutionMessage);
  // }

  async getSelectedActiveEnemySubject(): Promise<string> {
    if(this.enemyStatsService.selectedActiveEnemySubject != null) {
      this.enemyStatsService.selectedActiveEnemySubject.subscribe({
        next: (activeEnemy: ActiveEnemy) => {
          this.selectedActiveEnemy = activeEnemy;
        },
        error: (error: Error) => {
          console.error(`getSelectedActiveEnemySubject on combar.service encountered an error: ${error}.`);
        }
      });
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async decrementAmmo(weapon: WeaponType): Promise<string> {
    const ammoInterval = setInterval(() => {
      this.weaponService.decrementWeaponAmmo(weapon, weapon.firingRate);
    }, 1000);
    
    return Promise.resolve(this.resolutionMessage);
  }

  async resetSelection(): Promise<string> {
    this.enemyStatsService.resetSelection();

    return Promise.resolve(this.resolutionMessage);
  }

  async appendCombatArray(): Promise<string> {
    const combatItem: WarshipCombatData = {activeEnemy: this.selectedActiveEnemy!, weapon: this.selectedWeapon!, weaponQuantity: await this.getWeaponQuantity()};
    this.warshipCombatArray!.push(combatItem);
    this.warshipCombatArraySubject.push(new Subject<WarshipCombatData>());
    if(this.warshipCombatArraySubject.length > 0) {
      this.warshipCombatArraySubject[this.warshipCombatArraySubject.length - 1].next(combatItem);
    }
    else {
      this.warshipCombatArraySubject[0].next(combatItem);
    }
    return Promise.resolve(this.resolutionMessage);
  }

  // async appendCombatArrayAuto(activeEnemy: ActiveEnemy, weapon: WeaponType): Promise<string> {
  //   const combatItem: WarshipCombatData = {activeEnemy: activeEnemy, weapon: weapon, weaponQuantity: await this.getWeaponQuantityAuto(weapon)};
  //   this.warshipCombatArray!.push(combatItem);
  //   this.warshipCombatArraySubject.push(new Subject<WarshipCombatData>());
  //   if(this.warshipCombatArraySubject.length > 0) {
  //     this.warshipCombatArraySubject[this.warshipCombatArraySubject.length - 1].next(combatItem);
  //   }
  //   else {
  //     this.warshipCombatArraySubject[0].next(combatItem);
  //   }
  //   return Promise.resolve(this.resolutionMessage);
  // }

  async appendCombatArrayAuto2(warshipCombatData: WarshipCombatData): Promise<string> {
    this.warshipCombatArray!.push(warshipCombatData);
    this.warshipCombatArraySubject.push(new Subject<WarshipCombatData>());
    if(this.warshipCombatArraySubject.length > 0) {
      this.warshipCombatArraySubject[this.warshipCombatArraySubject.length - 1].next(warshipCombatData);
    }
    else {
      this.warshipCombatArraySubject[0].next(warshipCombatData);
    }
    return Promise.resolve(this.resolutionMessage);
  }

  async startCombatBySelection(): Promise<string> {
    if(this.selectedWeapon != null) {
      await this.doWeaponHasVector();
    }
    else {
      this.logFeedback = "Weapon not selected";
      await this.appendRightUiLogFeedback();
    }

    return Promise.resolve(this.resolutionMessage);
  }
  // wip
  async startAutomaticCombat(): Promise<string> {
    let automaticCheckDistances = setInterval(async () => {});
    let weapons: {weapon: WeaponType, quantity: number}[];


    if(this.activeEnemyArray != null || this.activeEnemyArray != 0) {
      const activeEnemyArraySorted = this.activeEnemyArray.sort((a: ActiveEnemy, b: ActiveEnemy) => {
        return a.distance - b.distance;
      });

      automaticCheckDistances = setInterval(async () => {
        if(this.warshipCombatArray.length == 0) {
          // weapons = this.warshipType!.availableWeapons!;
        } 
        else {
          let counter = 0;
          weapons = await this.selectFreeWeaponAuto2(); 
          for(let weaponObj of weapons) {
            let activeEnemy: ActiveEnemy = activeEnemyArraySorted[counter];
            const hasVector: boolean = await this.doWeaponHasVectorAuto2(activeEnemy, weaponObj.weapon);
            if(hasVector == true) {
              let warshipCombatData: WarshipCombatData = {activeEnemy: activeEnemy, weapon: weaponObj.weapon, weaponQuantity: weaponObj.quantity};
              const isInRange = this.isEnemyInRangeAuto2(activeEnemy, weaponObj.weapon);
              await this.appendCombatArrayAuto2(warshipCombatData);
              await this.maintainCombat(warshipCombatData);
            }
          }
        }
      }, 1000);
      
      
    }

    return Promise.resolve(this.resolutionMessage);
  }

  // async isEnemyInRangeAuto(activeEnemy: ActiveEnemy, weapon: WeaponType): Promise<boolean> {
  //   let checker: boolean = true;
    
  //   switch(activeEnemy.enemyType.enemyClass) {
  //     case "air":
  //       if(weapon.range.air <= activeEnemy.distance) {
  //         await this.appendCombatArrayAuto(activeEnemy, weapon);
  //         await this.calculateDamage(this.selectedActiveEnemy!, this.selectedWeapon!);
  //       } 
  //     break;
      
  //     case "ground":
  //       if(weapon.range.ground <= activeEnemy.distance) {
  //         await this.appendCombatArrayAuto(activeEnemy, weapon);
  //         await this.calculateDamage(this.selectedActiveEnemy!, this.selectedWeapon!);
  //       } 
  //     break;

  //     case "submarine":
  //       if(weapon.range.submarine <= activeEnemy.distance) {
  //         await this.appendCombatArrayAuto(activeEnemy, weapon);
  //         await this.calculateDamage(this.selectedActiveEnemy!, this.selectedWeapon!);
  //       } 
  //     break;
  //   }
  //   return Promise.resolve(checker);
  // }

  async isEnemyInRangeAuto2(activeEnemy: ActiveEnemy, weapon: WeaponType): Promise<boolean> {
    let checker: boolean = false;
    
    switch(activeEnemy.enemyType.enemyClass) {
      case "air":

        if(weapon.range.air <= activeEnemy.distance) {
          return true;
        } 
      break;
      
      case "ground":
        if(weapon.range.ground <= activeEnemy.distance) {
          return true;
        } 
      break;

      case "submarine":
        if(weapon.range.submarine <= activeEnemy.distance) {
          return true;
        } 
      break;
    }
    return Promise.resolve(checker);
  }

  // async doWeaponHasVectorAuto(activeEnemy: ActiveEnemy, weapon: WeaponType, distance: number): Promise<boolean> {
  //   let checker: boolean = true;
  //   let containsVector: boolean = weapon.attackVector.includes(activeEnemy.enemyType.enemyClass);
  //   if(containsVector == true) {
  //     await this.isEnemyInRangeAuto(activeEnemy, weapon);
  //   }

  //   return Promise.resolve(checker);
  // }

  async doWeaponHasVectorAuto2(activeEnemy: ActiveEnemy, weapon: WeaponType): Promise<boolean> {
    const containsVector: boolean = weapon.attackVector.includes(activeEnemy.enemyType.enemyClass);

    return Promise.resolve(containsVector);
  }

  // async selectFreeWeaponAuto(activeEnemy: ActiveEnemy,distance: number): Promise<string> {
  //   if(this.warshipCombatArray != null && this.warshipCombatArray.length == 0) {
  //     for(let i = 0; i < this.warshipType!.availableWeapons!.weapon.length; i++) {
  //       await this.doWeaponHasVectorAuto(activeEnemy, this.warshipType!.availableWeapons!.weapon[i], distance);
  //     } 
  //   } 
  //   else if (this.warshipCombatArray != null && this.warshipCombatArray.length != 0) {
  //     for(let i = 0; i < this.warshipType!.availableWeapons!.weapon.length; i++) {
  //       const includes = this.warshipCombatArray.find((warshipCombatItem: WarshipCombatData) => {
  //         return this.warshipType!.availableWeapons!.weapon[i] == warshipCombatItem.weapon
  //       })
  //       if(includes == undefined) {
  //         await this.doWeaponHasVectorAuto(activeEnemy, this.warshipType!.availableWeapons!.weapon[i], distance);
  //       }
  //     }
  //   } 
  //   return Promise.resolve(this.resolutionMessage);
  // }

  async selectFreeWeaponAuto2(): Promise<{weapon: WeaponType, quantity: number}[]>{
    const availableWeapons = this.warshipType!.availableWeapons!;
    let weapons = [];
  if (this.warshipCombatArray != null && this.warshipCombatArray.length != 0) {
      for(let i = 0; i < availableWeapons.weapon.length; i++) {
        const includes = this.warshipCombatArray.findIndex((warshipCombatItem: WarshipCombatData) => {
          return availableWeapons.weapon[i] == warshipCombatItem.weapon;
        });
        if(includes == -1) {
          let weaponObject: {weapon: WeaponType, quantity: number} = {weapon: availableWeapons.weapon[i], quantity: availableWeapons.quantity[i]}
          weapons.push(weaponObject);
        }
      }
    } 
    return Promise.resolve(weapons);
  }
  
  async getWeaponIndexInWarshipWeaponsAuto(weapon: WeaponType): Promise<number> {
    const index = this.warshipType!.availableWeapons!.weapon.findIndex((weaponType: WeaponType) => {
      return weaponType == weapon;
    });
    
    return Promise.resolve(index);
  }

  async getWeaponQuantityAuto(weapon: WeaponType): Promise<number> {
    const index = await this.getWeaponIndexInWarshipWeaponsAuto(weapon);
    const quantity = this.warshipType!.availableWeapons!.quantity[index];

    return Promise.resolve(quantity);
  }
  
  async getWeaponIndexInWarshipWeapons(): Promise<number> {
    const index = this.warshipType!.availableWeapons!.weapon.findIndex((weaponType: WeaponType) => {
      return weaponType == this.selectedWeapon!;
    });
    
    return Promise.resolve(index);
  }

  async getWeaponQuantity(): Promise<number> {
    const index = await this.getWeaponIndexInWarshipWeapons();
    const quantity = this.warshipType!.availableWeapons!.quantity[index];

    return Promise.resolve(quantity);
  }

  async createAutoCombatWorker(): Promise<string> {

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('src/app/combat/Workers/automatic-combat-worker.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      throw new Error("The game won't work because this browser or environment don't support web workers.");
    }
    
    return Promise.resolve(this.resolutionMessage);
  }

  async calculateDamage(activeEnemy: ActiveEnemy, weapon: WeaponType): Promise<number> {
    const random: number = Math.floor(Math.random());
    const damageArray: number[] = weapon.damage;
    let damage: number = 0;
    if(random >= 5) {
      damage = damageArray[0];
    }
    else {
      damage = damageArray[1];
    }
    
    const enduranceTaken = weapon.armorPenetration + (weapon.firingRate * damage);

    if(enduranceTaken <= activeEnemy.enemyType.armor) {
      this.logFeedback = `${activeEnemy.elementID} takes no damage.`;
      this.appendRightUiLogFeedback();
    }
    else {
      await this.dealDamage(activeEnemy, enduranceTaken)
    }
    
    return Promise.resolve(damage)
  }

  // wip
  async dealDamage(activeEnemy: ActiveEnemy, enduranceTaken: number): Promise<string> {
    const firingInterval = setInterval(async () => {
      const endurance = await this.enemyStatsService.decreaseEnemyEndurance(activeEnemy, enduranceTaken);
      if(endurance <= 0) {
        const index = await this.enemyStatsService.findEnemyIndexByElementId(activeEnemy.elementID);
        await this.enemyStatsService.removeDeadEnemy(index);
        await this.stopDealingDamage();
      }
    }, 1000); 
    this.firingInterval = firingInterval;

    return Promise.resolve(this.resolutionMessage);
  }

  async stopDealingDamage(): Promise<string> {
    if(this.firingInterval != null) {
      clearInterval(this.firingInterval!);
      this.firingInterval = null;
    } 

    return Promise.resolve(this.resolutionMessage);
  }

  async isEnemyAlreadySelectedBySelectedWeapon(): Promise<boolean> {
    let checker = true;
  
    const warshipCombatItem = this.warshipCombatArray!.find((combatItem: WarshipCombatData) => {
      return (combatItem.activeEnemy == this.selectedActiveEnemy && combatItem.weapon == this.selectedWeapon);
    })
    
    if((this.warshipCombatArray! == null)) {
      checker = false;
      this.appendCombatArray();
      this.calculateDamage(this.selectedActiveEnemy!, this.selectedWeapon!);
    } 
    else if((this.warshipCombatArray! != null) && (typeof warshipCombatItem != undefined)) {
      checker = true;
      this.logFeedback = `${this.selectedActiveEnemy!.elementID} already selected by ${this.selectedWeapon!.weaponName}.`;
      await this.appendRightUiLogFeedback();
    }

    return Promise.resolve(checker);
  }

  // wip
  async maintainCombat(WarshipCombatData: WarshipCombatData): Promise<string> {
    let combatInterval = setInterval(async () => {});
    if(this.activeEnemyArray != null || this.activeEnemyArray != 0) {
      combatInterval = setInterval(async () => {
        const remainsInDistance = await this.isEnemyInRangeAuto2(WarshipCombatData.activeEnemy, WarshipCombatData.weapon);
        if(remainsInDistance == true) {
          await this.calculateDamage(WarshipCombatData.activeEnemy, WarshipCombatData.weapon);
        } 
        else {
          await this.stopDealingDamage();
        }
      }, 1000);
    }
    else {
      clearInterval(combatInterval);
    }
    return Promise.resolve(this.resolutionMessage);
  }
  // wip
  async breakCombat(): Promise<string> {

    return Promise.resolve(this.resolutionMessage);
  }

  async isWeaponBusy(): Promise<boolean> {
    let checker = false;
    let counter = 0;
    this.warshipCombatArray!.forEach((combatItem: WarshipCombatData) => {
      if(combatItem.weapon = this.selectedWeapon!) {
        counter++;
      } 
    });

    const weaponQuantity = await this.getWeaponQuantity();

    if(counter > weaponQuantity) {
      checker = true;
      this.logFeedback = `${this.selectedWeapon} is busy.`;
    }
    else if(counter <= weaponQuantity) {
      checker = false;
      await this.isEnemyAlreadySelectedBySelectedWeapon();
    }

    return Promise.resolve(checker);
  }

  async doWeaponHasVector(): Promise<boolean> {
    let checker: boolean = false;

    if(this.selectedWeapon!.attackVector.includes(this.selectedActiveEnemy!.enemyType!.enemyClass)) {
      this.doSelectedWeaponHasRange();
      checker = true;
    }
    else {
      this.logFeedback = `Weapon can't target ${this.selectedActiveEnemy!.enemyType!.enemyClass} enemies`;
      this.appendRightUiLogFeedback();
    }

    return Promise.resolve(checker);
  }

  async doSelectedWeaponHasRange(): Promise<boolean> {
    let checker = false;
    if(((this.selectedWeapon!.range.ground / 10) >= (this.warshipX - this.selectedActiveEnemy!.x)) || ((this.selectedWeapon!.range.air / 10) >= (this.warshipX - this.selectedActiveEnemy!.x)) || ((this.selectedWeapon!.range.submarine / 10) >= (this.warshipX - this.selectedActiveEnemy!.x))) {
      await this.isWeaponBusy();
      checker = true;
    } 
    else {
      this.logFeedback = `Enemy out of range`;
      this.appendRightUiLogFeedback();
    }

    return Promise.resolve(checker)
  }
  
}