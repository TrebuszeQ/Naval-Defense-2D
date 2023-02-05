import { Injectable } from '@angular/core';
// interfaces
import { WarshipType } from 'src/app/character/interfaces/warship-type';
import { Enemy } from 'src/app/enemy-wrapper/Interfaces/enemy';
import { TorpedoType } from 'src/app/torpedo/Interfaces/torpedo-type';
import { WeaponType } from 'src/app/weapon/Interfaces/weapon-type';
import { ActiveEnemy } from 'src/app/enemy-wrapper/Interfaces/active-enemy';
import { WarshipCombatItem } from '../Interfaces/combat-item';
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
  warshipCombatArray: WarshipCombatItem[] = [];

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
    const combatItem: WarshipCombatItem = {enemyStats: this.selectedActiveEnemy!, weapon: this.selectedWeapon!, weaponQuantity: await this.getWeaponQuantity()};

    this.warshipCombatArray!.push(combatItem);

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

  async startAutomaticCombat(): Promise<string> {

  }

  async isEnemyInDistance(): Promise<boolean> {
    let checker: boolean = true;

    return Promise.resolve(checker);
  }

  async getWeaponIndexInWarshipWeapons(): Promise<number> {
    const index = this.warshipType!.availableWeapons!.weapon.findIndex((weaponType: WeaponType) => {
      return weaponType = this.selectedWeapon!;
    });
    
    return Promise.resolve(index);
  }

  async getWeaponQuantity(): Promise<number> {
    const index = await this.getWeaponIndexInWarshipWeapons();
    const quantity = this.warshipType!.availableWeapons!.quantity[index];

    return Promise.resolve(quantity);
  }

  async createCombatWorker(): Promise<string> {

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('src/app/combat/Workers/combat.worker.ts', import.meta.url));
      worker.onmessage = ({ data }) => {
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
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
      this.enemyStatsService.decreaseEnemyEndurance(activeEnemy, enduranceTaken);
    }
    
    return Promise.resolve(damage)
  }

  async isEnemyAlreadySelectedBySelectedWeapon(): Promise<boolean> {
    let checker = true;
  
    const warshipCombatItem = this.warshipCombatArray!.find((combatItem: WarshipCombatItem) => {
      return (combatItem.enemyStats == this.selectedActiveEnemy && combatItem.weapon == this.selectedWeapon);
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

  async isWeaponBusy(): Promise<boolean> {
    let checker = false;
    let counter = 0;
    this.warshipCombatArray!.forEach((combatItem: WarshipCombatItem) => {
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
      this.doWeaponHasRange();
      checker = true;
    }
    else {
      this.logFeedback = `Weapon can't target ${this.selectedActiveEnemy!.enemyType!.enemyClass} enemies`;
      this.appendRightUiLogFeedback();
    }

    return Promise.resolve(checker);
  }

  async doWeaponHasRange(): Promise<boolean> {
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