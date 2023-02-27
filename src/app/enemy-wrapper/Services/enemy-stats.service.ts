import { Injectable } from '@angular/core';
// rxjs
import { count, Observable, of, Subject } from 'rxjs';
// interfaces
import { ActiveEnemy } from '../Interfaces/active-enemy';
// services
import { EnemyCounterService } from './enemy-counter.service';
import { RightUiLogService } from 'src/app/level-wrapper/levels/Services/rightui-log.service';
import { WarshipPositionService } from 'src/app/character/services/warship-position.service';
import { CombatService } from 'src/app/combat/Services/combat.service';
// arrays
import { activeEnemyArray, activeEnemyArraySubject, activeEnemyArraySubjectAll } from '../Arrays/active-enemy-array';


@Injectable({
  providedIn: 'root'
})
export class EnemyStatsService {

  resolutionMessage: string = "resolved";
  maxGridRow: number = 42;
  waterLevel: number = 0;
  index: number = 0;
  selectedActiveEnemy: ActiveEnemy | null = null;
  selectedActiveEnemySubject: Subject<ActiveEnemy> | null = new Subject<ActiveEnemy>();
  activeEnemyArray: ActiveEnemy[] = activeEnemyArray;
  activeEnemyArraySubjectAll: Subject<ActiveEnemy[]> = activeEnemyArraySubjectAll;
  enemyDestroyed: ActiveEnemy[] = [];
  enemyToDestroy: Subject<ActiveEnemy> = new Subject<ActiveEnemy>();
  logFeedback: string = "";
  warshipX: number | null = null;
  constructor(private enemyCounterService: EnemyCounterService, private rightUiLogService: RightUiLogService, private warshipPositionService: WarshipPositionService, ) {
    this.getStartingWarshipPosition();
    this.getWarshipPositionSubject();
  }

  // getActiveEnemyArrayObservable() {
  //   return of(activeEnemyArray);
  // }

  async appendRightUiLogFeedback(): Promise<string> {
    this.rightUiLogService.updateRightUiLog(this.logFeedback);

    this.logFeedback = '';
    return Promise.resolve(this.resolutionMessage);
  }

  async selectEnemy(activeEnemy: ActiveEnemy) {
    this.selectedActiveEnemy = activeEnemy;
    this.selectedActiveEnemySubject!.next(activeEnemy);

    return Promise.resolve(this.resolutionMessage);
  }

  async resetSelection() {
    this.selectedActiveEnemy = null;
    this.selectedActiveEnemySubject = null;
  }

  async findEnemyIndexByElementId(elementID: string): Promise<number> {
    const index = this.activeEnemyArray.findIndex((activeEnemy: ActiveEnemy) => {
      return activeEnemy.elementID == elementID;
    })

    return Promise.resolve(index);
  }

  async appendActiveEnemyArray(activeEnemy: ActiveEnemy): Promise<string> {
    this.activeEnemyArray.push(activeEnemy);
    await this.updateActiveEnemyArraySubjectAll();
    return Promise.resolve(this.resolutionMessage);
  }

  // async spawnWorkerForActiveEnemy(activeEnemy: ActiveEnemy): Promise<string> {
    
  //   if (typeof Worker !== 'undefined') {
  //     // Create a new
  //     const worker = new Worker(new URL('src/app/combat/Workers/combat.worker.ts', import.meta.url));
  //     worker.onmessage = ({ data }) => {
  //     };
  //     worker.postMessage('hello');
  //   } else {
  //     // Web Workers are not supported in this environment.
  //     // You should add a fallback so that your program still executes correctly.
  //   }

  //   return Promise.resolve(this.resolutionMessage);
  // }

  async removeDeadEnemy(index: number): Promise<string> {
    let activeEnemyArray: ActiveEnemy[] = this.activeEnemyArray;
    this.enemyToDestroy.next(activeEnemyArray[index]);
    this.enemyDestroyed.push(activeEnemyArray[index]);
    activeEnemyArray = this.activeEnemyArray.splice(index, 1);
    this.activeEnemyArray = activeEnemyArray;
    console.warn(activeEnemyArray, this.enemyToDestroy, this.enemyDestroyed);
    await this.updateActiveEnemyArraySubjectAll();
    await this.removeEnemyCounters(index);
    return Promise.resolve(this.resolutionMessage);
  }

async removeEnemyCounters(index: number): Promise<void> {
  const index2 = await this.enemyCounterService.findEnemyIndexByName(activeEnemyArray[index].elementID);
  await this.enemyCounterService.decrementAllEnemyCounter();
  await this.enemyCounterService.decrementEnemySubjectsArray(index2);

  return Promise.resolve();
}

  async decreaseEnemyEndurance(activeEnemy: ActiveEnemy, amount: number): Promise<number> {
    const index = await this.findEnemyIndexByElementId(activeEnemy.elementID);
    const activeEnemyArray = this.activeEnemyArray;
    const enemyTakingDamage = activeEnemyArray[index];   
    if(enemyTakingDamage.endurance <= 0) {

      await this.removeDeadEnemy(index);
    }
    else if(enemyTakingDamage.endurance > 0) {
      enemyTakingDamage.endurance -= amount;
      activeEnemyArray[index] = enemyTakingDamage;
    }
    await this.updateActiveEnemyArraySubjectAll();
    return Promise.resolve(enemyTakingDamage.endurance);
  }

  async getStartingWarshipPosition(): Promise<string> {
    const getStartingWarshipXObserver = { 
      next: async (warshipX: number) => {
        this.warshipX = warshipX;
      },
      error: async (error: Error) => {
        console.error(`getStartingWarshipX on character.component encountered an error: ${error}`);
      },

    };

    this.warshipPositionService.getStartingWarshipX().subscribe(getStartingWarshipXObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipPositionSubject(): Promise<string> {
    this.warshipPositionService.warshipXSubject.subscribe({
      next: async (warshipX: number) => {
        this.warshipX = warshipX;
        if(this.activeEnemyArray != null && this.activeEnemyArray.length != 0) {
          await this.updateActiveEnemyArrays();
        }
      },
      error: async (error: Error) => {
        console.error(`getWatershipPositionSubject() on enemy-stats.service encountered an error: ${error}`);
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }

  async updateActiveEnemyArrays(): Promise<void>  {
    for(let enemy of this.activeEnemyArray) {
      const distance = await this.calculateDistanceX(enemy);
      enemy.distance = distance;
      await this.updateActiveEnemyArraySubjectAll();
    }

    return Promise.resolve();
  }

  async updateActiveEnemyArraySubjectAll(): Promise<void> {
    this.activeEnemyArraySubjectAll.next(this.activeEnemyArray);
    return Promise.resolve();
  }
  
  async calculateDistanceX(activeEnemy: ActiveEnemy): Promise<number> {
    const distance: number = Math.abs(activeEnemy.x) - Math.abs(this.warshipX!);
    return Promise.resolve(Math.abs(distance));
  }
}
