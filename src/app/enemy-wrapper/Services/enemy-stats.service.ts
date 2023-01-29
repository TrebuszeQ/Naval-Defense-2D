import { Injectable } from '@angular/core';
// rxjs
import { Observable, of, Subject } from 'rxjs';
// interfaces
import { Enemy } from '../Interfaces/enemy';
import { EnemyStats, EnemyStatsSubjects } from '../Interfaces/enemy-stats';
// services



@Injectable({
  providedIn: 'root'
})
export class EnemyStatsService {

  resolutionMessage: string = "resolved";
  maxGridRow: number = 42;
  waterLevel: number = 0;
  selectedEnemyStats: EnemyStats | null = null;
  selectedEnemyStatsSubject: Subject<EnemyStats> = new Subject<EnemyStats>;
  selectedEnemiesStatsArray: EnemyStats[] | null = null;
  selectedEnemiesStatsArraySubject: Subject<EnemyStats[]> = new Subject<EnemyStats[]>();
  index: number = 0;
  enemyStatsArray: EnemyStats[] = [];
  enemyStatsArraySubject: Subject<EnemyStats>[] = [new Subject<EnemyStats>()];
  enemyStatsArraySubjects: EnemyStatsSubjects[] = [];
  constructor() {}

  async selectEnemy(enemyStats: EnemyStats) {
    this.selectedEnemyStats = enemyStats;
    this.selectedEnemyStatsSubject.next(enemyStats);
    this.selectedEnemiesStatsArray!.push(enemyStats);
    this.selectedEnemiesStatsArraySubject.next(this.selectedEnemiesStatsArray!);

    return Promise.resolve("resolve");
  }

  async appendEnemyStatsArray(enemyStatsItem: EnemyStats): Promise<string> {
    const checker: boolean = this.enemyStatsArray.includes(enemyStatsItem);

    if(checker == false) {
      this.enemyStatsArray.push(enemyStatsItem);
      this.enemyStatsArraySubject[this.enemyStatsArraySubject.length - 1].next(enemyStatsItem);
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async setEnemyStatsByItem(): Promise<string> {
    this.enemyStatsArraySubject[this.index].next(this.selectedEnemyStats!);

    return Promise.resolve(this.resolutionMessage);
  }

  async setEnemyStatsX(): Promise<string> {
    this.enemyStatsArray[this.index].x = this.selectedEnemyStats!.x;
    this.enemyStatsArraySubjects[this.index].x.next(this.selectedEnemyStats!.x);

    return Promise.resolve(this.resolutionMessage);
  }

  async setEnemyStatsY(): Promise<string> {
    this.enemyStatsArray[this.index].y = this.selectedEnemyStats!.y;
    this.enemyStatsArraySubjects[this.index].x.next(this.selectedEnemyStats!.y);

    return Promise.resolve(this.resolutionMessage);
  }

  async setEnemyStatsEndurance(): Promise<string> {
    this.enemyStatsArray[this.index].endurance = this.selectedEnemyStats!.endurance;
    this.enemyStatsArraySubjects[this.index].endurance.next(this.selectedEnemyStats!.endurance);

    return Promise.resolve(this.resolutionMessage);
  }

  async findEnemyByElementID(): Promise<number> {
    const index = this.enemyStatsArray.findIndex((enemyStat: EnemyStats) => {
      enemyStat.elementID = this.selectedEnemyStats!.elementID;
    });
  
    return Promise.resolve(index);
  }
}
