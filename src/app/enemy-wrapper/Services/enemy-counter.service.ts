import { Injectable } from '@angular/core';
// rxjs
import { Observable, Subject, of } from 'rxjs';

// interfaces
import { Enemy } from '../Interfaces/enemy';
import { Level } from 'src/app/level-wrapper/levels/interfaces/level';
// services
import { EnemyArrayService } from './enemy-array.service';
import { LevelService } from 'src/app/level-wrapper/levels/Services/level.service';


@Injectable({
  providedIn: 'root'
})
export class EnemyCounterService {

  resolutionMessage: string = "resolved";
  enemyArray: Enemy[] | null = null;
  level: Level | null = null;

  enemyCounterArray: {name: string, quantity: number}[] = [
    {
      name: "all",
      quantity: 0,
    }
  ]

  enemyCounterArraySubjects: {name: string, subjectQuantity: Subject<number>}[] = [
    {
      name: "all",
      subjectQuantity: new Subject<number>(),
    },
  ]

  constructor(private enemyArrayService: EnemyArrayService, private levelService: LevelService) { 
    this.getEnemyArray();
    this.getLevel();
    this.fillEnemyCounterArray();
  }

  async getLevel(): Promise<string> {
    const getLevelObserver = {
      next: (level: Level) => {
        this.level = level;
      },
      error: (error: Error) => {
        console.error(`getLevelObserver on enemy-counter.service encountered an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getLevelObserver on enemy-counter.service completed.");
      // }
    }

    this.levelService.getSelectedLevel().subscribe(getLevelObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async findEnemyIndexByName(enemyName: string): Promise<number> {
    const index = this.enemyCounterArray.findIndex((enemy: {name: string, quantity: number}) => {
      return enemy.name = enemyName;
    });

    return Promise.resolve(index);
  }

  async getEnemyArray(): Promise<string> {
    const getEnemyArrayObserver = {
      next: (enemyArray: Enemy[]) => {
        this.enemyArray = enemyArray;
      },
      error: (error: Error) => {
        console.error(`getEnemyArrayObserver on enemy.component encountered an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getEnemyArrayObserver on enemy.component completed");
      // }
    }

    this.enemyArrayService.getEnemyArray().subscribe(getEnemyArrayObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async fillEnemyCounterArray(): Promise<string> {

    for(let i = 0; i < this.level!.enemies.length; i++) {
      this.enemyCounterArray.push({name: this.level!.enemies[i].enemyName, quantity: 0});
      this.enemyCounterArraySubjects.push({name: this.level!.enemies[i].enemyName, subjectQuantity: new Subject<number>});
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async incrementAllEnemyCounter(): Promise<string> {
    this.enemyCounterArray[0].quantity++;
    this.enemyCounterArraySubjects[0].subjectQuantity.next(this.enemyCounterArray[0].quantity);

    return Promise.resolve(this.resolutionMessage);
  } 

  async decrementAllEnemyCounter(): Promise<string> {
    this.enemyCounterArray[0].quantity--;
    this.enemyCounterArraySubjects[0].subjectQuantity.next(this.enemyCounterArray[0].quantity);

    return Promise.resolve(this.resolutionMessage);
  } 

  async incrementEnemySubjectsArray(index: number): Promise<string> {
    await this.incrementAllEnemyCounter();

    this.enemyCounterArray[index].quantity++;
    this.enemyCounterArraySubjects[index].subjectQuantity.next(this.enemyCounterArray[index].quantity);

    return Promise.resolve(this.resolutionMessage);
  }

  async decrementEnemySubjectsArray(index: number): Promise<string> {
    await this.incrementAllEnemyCounter();

    this.enemyCounterArray[index].quantity--;
    this.enemyCounterArraySubjects[index].subjectQuantity.next(this.enemyCounterArray[index].quantity);

    return Promise.resolve(this.resolutionMessage);
  }

  getSingleCounter(index: number): Observable<number>  {
    return of(this.enemyCounterArray[index].quantity);
  }

  // async searchForName(name: string): Promise<number> {
  //   return this.enemyArray!.findIndex((enemy: Enemy) => enemy.enemyName = name);
  // }
}
