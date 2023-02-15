import { Injectable } from '@angular/core';
// rxjs
import { Observable, of } from 'rxjs';
// arrays
import { levelArray } from '../Arrays/level-array';
// interfaces
import { Level } from '../interfaces/level';

@Injectable({
  providedIn: 'root'
})
export class LevelArrayService {

  warshipCarouselMax: number = 0;

  constructor() { }

  getLevelArray(): Observable<Level[]> {
    
    return of(levelArray);
  }

}
