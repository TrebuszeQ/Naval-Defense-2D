import { Injectable } from '@angular/core';
// rxjs
import { Observable, of } from 'rxjs';
//  interfaces 
import { Levels } from '../interfaces/levels';


@Injectable({
  providedIn: 'root'
})
export class LevelService {

  levelSelected!: Levels;

  constructor() {}
  
  async setSelectedLevel(level: Levels): Promise<string> {
    this.levelSelected = level;

    return Promise.resolve("resolved");
  }

  getSelectedLevel(): Observable<Levels> {
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