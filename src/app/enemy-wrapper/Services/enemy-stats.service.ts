import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';
// interfaces
import { Enemy } from '../Interfaces/enemy';
import { EnemyStats } from '../Interfaces/enemy-stats';


@Injectable({
  providedIn: 'root'
})
export class EnemyStatsService {

  resolutionMessage: string = "resolved";
  maxGridRow: number = 42;
  waterLevel: number = 0;
  selectedEnemy: Enemy | null = null;
  selectedEnemyPosition: number[] = [];
  enemyStatsArray: EnemyStats[] = [];
  enemyStatsArraySubject: Subject<EnemyStats> = new Subject<EnemyStats>();
  constructor() { }

  async appendEnemyStatsArray(enemyPositionItem: EnemyStats): Promise<string> {
    const checker: boolean = this.enemyStatsArray.includes(enemyPositionItem);

    if(checker == false) {
      this.enemyStatsArray.push(enemyPositionItem);
      this.enemyStatsArraySubject.next(enemyPositionItem);
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async setEnemyStatsX(elementID: string, x: number) {
    const index = await this.findEnemyByElementID(elementID);
    this.enemyStatsArray[index].x = x;
    this.enemyStatsArraySubject.next()
  }

  async findEnemyByElementID(elementID: string): Promise<number> {
    const index = this.enemyStatsArray.findIndex((enemyStat: EnemyStats) => {
      enemyStat.elementID = elementID;
  });
  
  return Promise.resolve(index);
}
