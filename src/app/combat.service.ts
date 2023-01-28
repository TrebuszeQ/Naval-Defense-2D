import { Injectable } from '@angular/core';
// interfaces
import { WarshipType } from './character/interfaces/warship-type';
import { Enemy } from './enemy-wrapper/Interfaces/enemy';
import { TorpedoType } from './torpedo/Interfaces/torpedo-type';
import { WeaponType } from './weapon/Interfaces/weapon-type';
import { EnemyStats } from './enemy-wrapper/Interfaces/enemy-stats';
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
import { EnemySelectionService } from './enemy-wrapper/Services/enemy-selection.service';
import { RightUiLogService } from './level-wrapper/levels/Services/rightui-log.service';
// components
import { EnemyComponent } from './enemy-wrapper/Components/enemy/enemy.component';
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
  selectedEnemy: EnemyStats | null = null;
  torpedo: TorpedoType | null = null;

  constructor(private warshipTypeService: WarshipTypeService, private warshipPositionService: WarshipPositionService, private weaponService: WeaponService, private enemyPositionService: EnemyStatsService, private enemyCounterService: EnemyCounterService, private torpedoService: TorpedoService, private torpedoTypeService: TorpedoTypeService, private torpedoTrajectoryService: TorpedoTrajectoryService, private torpedoEffectsService: TorpedoEffectsService, private enemySelectionService: EnemySelectionService, private rightUiLogService: RightUiLogService) { 
    this.getWarshipType();
    this.getWarshipPositionSubject();
    this.getWeapon();
    this.getSelectedEnemySubject();
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
    this.enemySelectionService.selectedEnemySubject.subscribe({
      next: (enemyPosition: EnemyStats) => {
        this.selectedEnemy = enemyPosition;
        this.enemy = enemyPosition.enemyType;
      },
      error: (error: Error) => {
        console.error(`getSelectedEnemySubject on combat.service encountered an error: ${error}.`);
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }

  async startCombatBySelection(): Promise<string> {



    return Promise.resolve(this.resolutionMessage);
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
    if((this.selectedWeapon!.range.air <= this.selectedEnemy!.x) || (this.selectedWeapon!.range.ground <= this.selectedEnemy!.x) || (this.selectedWeapon!.range.submarine <= this.selectedEnemy!.x)) {

    }

    return Promise.resolve(this.resolutionMessage)
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