import { Injectable } from '@angular/core';
// rxjs
import { Observable, of } from 'rxjs';
// arrays
import { enemyArray } from '../Arrays/enemy-array';
// interfaces
import { Enemy } from '../Interfaces/enemy';

@Injectable({
  providedIn: 'root'
})
export class EnemyArrayService {

  constructor() { }

  getEnemyArray(): Observable<Enemy[]> {
    
    return of(enemyArray);
  }

  async getEnemyByName(enemyName: string): Promise<Enemy | undefined> {
    const enemy = enemyArray.find((enemy: Enemy) => {
      return enemy.enemyName == enemyName;
    });

    return Promise.resolve(enemy);
  }

  async getEnemyIndexByName(enemyName: string): Promise<number> {
    const index = enemyArray.findIndex((enemy: Enemy) => {
      return enemy.enemyName == enemyName;
    });

    return Promise.resolve(index);
  }
}
