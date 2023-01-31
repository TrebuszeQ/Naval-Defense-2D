import { Injectable } from '@angular/core';
// rxjs
import { Observable, of, Subject } from 'rxjs';
// interfaces
import { ActiveEnemy, ActiveEnemySubjects } from '../Interfaces/active-enemy';
import { WeaponType } from 'src/app/weapon/Interfaces/weapon-type';
// services



@Injectable({
  providedIn: 'root'
})
export class EnemyStatsService {

  resolutionMessage: string = "resolved";
  maxGridRow: number = 42;
  waterLevel: number = 0;
  index: number = 0;
  selectedActiveEnemy: ActiveEnemy | null = null;
  selectedActiveEnemySubject: Subject<ActiveEnemy> = new Subject<ActiveEnemy>;
  activeEnemyArray: ActiveEnemy[] = [];
  activeEnemyArraySubject: Subject<ActiveEnemy>[] = [];
  constructor() {}

  async selectEnemy(activeEnemy: ActiveEnemy) {
    this.selectedActiveEnemy = activeEnemy;
    this.selectedActiveEnemySubject.next(activeEnemy);

    return Promise.resolve(this.resolutionMessage);
  }

  async findEnemyIndexByElementId(elementID: string): Promise<number> {
    const index = this.activeEnemyArray.findIndex((activeEnemy: ActiveEnemy) => {
      activeEnemy.elementID == elementID;
    })

    return Promise.resolve(index);
  }

  async appendActiveEnemyArray(activeEnemy: ActiveEnemy): Promise<string> {
    this.activeEnemyArray.push(activeEnemy);
    this.activeEnemyArraySubject.push(new Subject());
    this.activeEnemyArraySubject[this.activeEnemyArray.length - 1].next(activeEnemy);

    this.activeEnemyArraySubject[this.activeEnemyArray.length - 1].subscribe({
      next: (activeEnemySubject: ActiveEnemy) => {
        if(activeEnemySubject.endurance <= 0) {
          
        }
      }
    })

    return Promise.resolve(this.resolutionMessage);
  }

  async setEnemyStatsByItem(activeEnemy: ActiveEnemy, elementID: string): Promise<string> {
    const index = await this.findEnemyIndexByElementId(elementID);
    this.activeEnemyArray[index] = activeEnemy;
    this.activeEnemyArraySubject[index].next(activeEnemy);

    return Promise.resolve(this.resolutionMessage);
  }

  async removeDeadEnemy() {}

  async decreaseEnemyEndurance(activeEnemy: ActiveEnemy, amount: number): Promise<string> {
    const index = await this.findEnemyIndexByElementId(activeEnemy.elementID);

    if(this.activeEnemyArray[index].endurance <= 0) {

    }
    else {
      this.activeEnemyArray[index].endurance -= amount;
      this.activeEnemyArraySubject[index].next(this.activeEnemyArray[index]);
    }
    return Promise.resolve(this.resolutionMessage);
  }

  async watchEnemyEndurance(elementID: string): Promise<string> {
    const index = await this.findEnemyIndexByElementId(elementID);

    this.activeEnemyArraySubject[index].subscribe({
      next: async (activeEnemySubject: ActiveEnemy) => {
        if(activeEnemySubject.endurance <= 0) {
          await this.removeDeadEnemy();
        };
      }
    })

    return Promise.resolve(this.resolutionMessage);
  }
}
