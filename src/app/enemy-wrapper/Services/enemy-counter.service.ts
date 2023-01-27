import { Injectable } from '@angular/core';
// rxjs
import { Observable, Subject, of } from 'rxjs';
// interfaces
import { Enemy } from '../Interfaces/enemy';
// services
import { EnemyArrayService } from './enemy-array.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyCounterService {

  resolutionMessage: string = "resolved";
  enemyArray: Enemy[] | null = null;

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
    {
      name: this.enemyCounterArray[0].name,
      subjectQuantity: new Subject<number>(),
    }
  ]

  constructor(private enemyArrayService: EnemyArrayService) { 
    this.getEnemyArray();
    this.fillEnemyCounterArray();

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

    for(let i = 0; i < this.enemyArray!.length; i++) {
      this.enemyCounterArray.push({name: this.enemyArray![i].enemyName, quantity: 0});
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
