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
}
