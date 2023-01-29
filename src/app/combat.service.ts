import { Injectable } from '@angular/core';
// interfaces
import { WarshipType } from './character/interfaces/warship-type';
import { Enemy } from './enemy-wrapper/Interfaces/enemy';
import { TorpedoType } from './torpedo/Interfaces/torpedo-type';
import { WeaponType } from './weapon/Interfaces/weapon-type';
import { EnemyStats } from './enemy-wrapper/Interfaces/enemy-stats';
import { CombatItem } from './combat-item';
// services
import { WarshipPositionService } from './character/services/warship-position.service';
import { WarshipTypeService } from './character/services/warship-type.service';
import { WeaponService } from './weapon/Services/weapon.service';
import { EnemyStatsService } from './enemy-wrapper/Services/enemy-stats.service';
import { EnemyCounterService } from './enemy-wrapper/Services/enemy-counter.service';
import { TorpedoService } from './torpedo/Services/torpedo.service';
import { TorpedoTrajectoryService } from './torpedo/Services/torpedo-trajectory.service';
import { TorpedoTypeService } from './torpedo/Services/torpedo-type.service';
import { TorpedoEffectsService } from './torpedo/Services/torpedo-effects.service';
import { RightUiLogService } from './level-wrapper/levels/Services/rightui-log.service';
// types
import { vector } from './weapon/Types/vector';



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
  selectedEnemyStats: EnemyStats | null = null;
  torpedo: TorpedoType | null = null;
  combatArray: CombatItem[] | null = null;
  selectedEnemiesStatsArray: EnemyStats[] | null = null;

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
      next: (enemyPosition: EnemyStats) => {
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
      next: (selectedEnemiesStatsArray: EnemyStats[]) => {
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
    const x = this.combatArray!.find((combatItem: CombatItem) => {
      this.selectedEnemyStats == combatItem.enemyStats
    });
    if((this.combatArray! == null)) {
      checker = true;
    } 
    else if((this.combatArray! != null) && (typeof x != undefined)) {
      checker = false;
    }

    return Promise.resolve(checker);
  }

  async checkIfEnemyIsAlreadySelectedBySelectedWeapon(): Promise<boolean> {
    let checker = true;
  
    const x = this.combatArray!.find((combatItem: CombatItem) => {
      (combatItem.enemyStats == this.selectedEnemyStats && combatItem.weapon == this.selectedWeapon);
    })

    if((this.combatArray! == null)) {
      checker = true;
    } 
    else if((this.combatArray! != null) && (typeof x != undefined)) {
      checker = false;
    }

    return Promise.resolve(checker);
  }

  async appendCombatArray(): Promise<string> {
    const combatItem: CombatItem = {enemyStats: this.selectedEnemyStats!, weapon: this.selectedWeapon!, weaponQuantity: await this.getWeaponQuantity()};

    this.combatArray!.push(combatItem);

    return Promise.resolve(this.resolutionMessage);
  }

  async startCombatBySelection(): Promise<string> {
    if(this.selectedWeapon != null) {
      this.checkWeaponVector();
    }
    else {
      this.logFeedback = "Weapon not selected";
      this.appendRightUiLogFeedback();
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async checkIfWeaponIsBusy(): Promise<boolean> {
    let checker = false;
    let counter = 0;
    this.combatArray!.forEach((combatItem: CombatItem) => {
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
      const worker = new Worker(new URL('./combat.worker', import.meta.url));
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