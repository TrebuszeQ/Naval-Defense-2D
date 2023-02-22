import { Injectable } from '@angular/core';
// rxjs
import { Observable, of, Subject } from 'rxjs';
//  interfaces 
import { Level } from '../interfaces/level';


@Injectable({
  providedIn: 'root'
})
export class LevelService {

  levelSelected!: Level;
  levelSubject = new Subject<Level>();

  constructor() {}
  
  async setSelectedLevel(level: Level): Promise<string> {
    this.levelSelected = level;
    this.levelSubject.next(level);

    return Promise.resolve("resolved");
  }

  getSelectedLevel(): Observable<Level> {
    return of(this.levelSelected);
  }
}


// getSelectedWarshipType(): Observable<WarshipType> {
//   return of(this.warshipSelected);    
// }

// async setSelectedWarship(warship: WarshipType): Promise<string> {
//   this.warshipSelected = warship;
//   return Promise.resolve("resolved");   
// }