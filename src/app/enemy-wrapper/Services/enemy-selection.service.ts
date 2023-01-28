import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';
// interfaces
import { Enemy } from '../Interfaces/enemy';
import { EnemyStats } from '../Interfaces/enemy-stats';

@Injectable({
  providedIn: 'root'
})
export class EnemySelectionService {
  
  selectedEnemy: EnemyStats | null = null;
  selectedEnemySubject: Subject<EnemyStats> = new Subject<EnemyStats>;
  constructor() { }

  async selectEnemy(enemy: EnemyStats) {
    this.selectedEnemy = enemy;
    this.selectedEnemySubject.next(enemy);

    return Promise.resolve("resolve");
  }

}
