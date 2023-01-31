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
  enemy: Enemy | null = null;
  selectedEnemyStats: ActiveEnemy | null = null;
  torpedo: TorpedoType | null = null;
  warshipCombatArray: WarshipCombatItem[] = [];
  selectedEnemiesStatsArray: ActiveEnemy[] = [];

  constructor(private warshipTypeService: WarshipTypeService, private warshipPositionService: WarshipPositionService, private weaponService: WeaponService, private enemyPositionService: EnemyStatsService, private enemyCounterService: EnemyCounterService, private torpedoService: TorpedoService, private torpedoTypeService: TorpedoTypeService, private torpedoTrajectoryService: TorpedoTrajectoryService, private torpedoEffectsService: TorpedoEffectsService, private rightUiLogService: RightUiLogService, private enemyStatsService: EnemyStatsService) { 
    this.getWarshipType();
    this.getWarshipPositionSubject();
    this.getWeapon();
    this.getSelectedEnemySubject();
    this.getSelectedEnemiesArraySubject();
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

  async getWarshipPositionSubject(): Promise <string>{
    this.warshipPositionService.warshipXSubject.subscribe({
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      }
    });
    
    return Promise.resolve(this.resolutionMessage);
  }

  async getWeapon(): Promise<string> {
    this.weaponService.currentWeaponSubject.subscribe({
      next: (weapon: WeaponType) => {
        this.selectedWeapon = weapon;
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }

  async getSelectedEnemySubject(): Promise<string> {
    this.enemyStatsService.selectedEnemyStatsSubject.subscribe({
      next: (enemyPosition: ActiveEnemy) => {
        this.selectedEnemyStats = enemyPosition;
        this.enemy = enemyPosition.enemyType;
      },
      error: (error: Error) => {
        console.error(`getSelectedEnemySubject on combat.service encountered an error: ${error}.`);
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }

  async getSelectedEnemiesArraySubject(): Promise<string> {
    this.enemyStatsService.selectedEnemiesStatsArraySubject.subscribe({
      next: (selectedEnemiesStatsArray: ActiveEnemy[]) => {
        this.selectedEnemiesStatsArray = selectedEnemiesStatsArray;
      },
      error: (error: Error) => {
        console.error(`getSelectedEnemiesArraySubject() encountered an error: ${error}.`);
      }
    })

    return Promise.resolve(this.resolutionMessage);
  }

  async checkIfEnemyIsAlreadySelected(): Promise<boolean> {
    let checker = true;
    const x = this.warshipCombatArray!.find((combatItem: WarshipCombatItem) => {
      this.selectedEnemyStats == combatItem.enemyStats
    });
    if((this.warshipCombatArray! == null)) {
      checker = false;
    } 
    else if((this.warshipCombatArray! != null) && (typeof x != undefined)) {
      checker = true;
    }

    return Promise.resolve(checker);
  }

  async checkIfEnemyIsAlreadySelectedBySelectedWeapon(): Promise<boolean> {
    let checker = true;
  
    const x = this.warshipCombatArray!.find((combatItem: WarshipCombatItem) => {
      (combatItem.enemyStats == this.selectedEnemyStats && combatItem.weapon == this.selectedWeapon);
    })

    if((this.warshipCombatArray! == null)) {
      checker = false;
      this.appendCombatArray();
    } 
    else if((this.warshipCombatArray! != null) && (typeof x != undefined)) {
      checker = true;
      this.logFeedback = `${this.selectedEnemyStats!.elementID} already selected by ${this.selectedWeapon!.weaponName}.`;
      await this.appendRightUiLogFeedback();
    }

    return Promise.resolve(checker);
  }

  async decrementAmmo(weapon: WeaponType): Promise<string> {
    const ammoInterval = setInterval(() => {
      this.weaponService.decrementWeaponAmmo(weapon, weapon.firingRate);
    }, 1000);
    
    return Promise.resolve(this.resolutionMessage);
  }

  async appendCombatArray(): Promise<string> {
    const combatItem: WarshipCombatItem = {enemyStats: this.selectedEnemyStats!, weapon: this.selectedWeapon!, weaponQuantity: await this.getWeaponQuantity()};

    this.warshipCombatArray!.push(combatItem);

    return Promise.resolve(this.resolutionMessage);
  }

  async startCombatBySelection(): Promise<string> {
    if(this.selectedWeapon != null) {
      await this.checkWeaponVector();
    }
    else {
      this.logFeedback = "Weapon not selected";
      await this.appendRightUiLogFeedback();
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async checkIfWeaponIsBusy(): Promise<boolean> {
    let checker = false;
    let counter = 0;
    this.warshipCombatArray!.forEach((combatItem: WarshipCombatItem) => {
      if(combatItem.weapon = this.selectedWeapon!) {
        counter++;
      };
    });

    const weaponQuantity = await this.getWeaponQuantity();

    if(counter > weaponQuantity) {
      checker = true;
    }
    else if(counter <= weaponQuantity) {
      checker = false;
    }

    return Promise.resolve(checker);
  }

  async checkWeaponVector(): Promise<string> {
    const checker: boolean = false;

    if(this.selectedWeapon!.attackVector.includes(this.enemy!.enemyClass)) {
      this.checkWeaponRange();
    }
    else {
      this.logFeedback = `Weapon can't target ${this.enemy!.enemyClass} enemies`;
      this.appendRightUiLogFeedback();
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async checkWeaponRange(): Promise<string> {
    if(((this.selectedWeapon!.range.ground / 10) >= (this.warshipX - this.selectedEnemyStats!.x)) || ((this.selectedWeapon!.range.air / 10) >= (this.warshipX - this.selectedEnemyStats!.x)) || ((this.selectedWeapon!.range.submarine / 10) >= (this.warshipX - this.selectedEnemyStats!.x))) {
      await this.checkIfEnemyIsAlreadySelectedBySelectedWeapon();
    } 
    else {
      this.logFeedback = `Enemy out of range`;
      this.appendRightUiLogFeedback();
    }

    return Promise.resolve(this.resolutionMessage)
  }

  async getWeaponIndexInWarshipWeapons(): Promise<number> {
    const index = this.warshipType!.availableWeapons!.weapon.findIndex((weaponType: WeaponType) => {
      weaponType = this.selectedWeapon!;
    })
    
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
      const worker = new Worker(new URL('src/app/combat/Services/combat.service.ts', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
    
    return Promise.resolve(this.resolutionMessage);
  }
}