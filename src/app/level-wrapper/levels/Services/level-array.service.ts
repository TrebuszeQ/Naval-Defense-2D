import { Injectable } from '@angular/core';
// rxjs
import { Observable, of } from 'rxjs';
// arrays
import { levelArray } from '../Arrays/level-array';
// interfaces
import { Levels } from '../interfaces/levels';

@Injectable({
  providedIn: 'root'
})
export class LevelArrayService {

  warshipCarouselMax: number = 0;

  constructor() { }

  getLevelArray(): Observable<Levels[]> {
    
    return of(levelArray);
  }

}
