import { Injectable } from '@angular/core';
// rxjs
import { Observable, Subject, of } from 'rxjs';
// arrays
import { enemyArray } from '../Arrays/enemy-array';

@Injectable({
  providedIn: 'root'
})
export class EnemyCounterService {

  resolutionMessage: string = "resolved";

  
  enemyCounterArray: {name: string, quantity: number}[] = [
    {
      name: "all",
      quantity: 0,
    }
  ]

  enemyCounter: Subject<number> = new Subject<number>();
  alienPatrolObjectCounter: Subject<number> = new Subject<number>();

  enemySubjectsCounterArray: {name: string, subjectQuantity: Subject<number>}[] = [
    {
      name: "all",
      subjectQuantity: new Subject<number>(),
    },
    {
      name: this.enemyCounterArray[0].name,
      subjectQuantity: new Subject<number>(),
    }
  ]

  constructor() { 
    this.fillEnemyCounterArray();
   }

  async fillEnemyCounterArray(): Promise<string> {

    for(let i = 0; i < enemyArray.length; i++) {
      this.enemyCounterArray[i+1].name = enemyArray[i].enemyName;
      this.enemyCounterArray[i+1].quantity = 0;
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async incrementEnemySubjectsArray(index: number): Promise<string> {
    this.enemyCounterArray[0].quantity++;
    this.enemySubjectsCounterArray[0].subjectQuantity.next(this.enemyCounterArray[0].quantity++);
    this.enemyCounterArray[index].quantity++;
    this.enemySubjectsCounterArray[index].subjectQuantity.next(this.enemyCounterArray[index].quantity++);

    return Promise.resolve(this.resolutionMessage);
  }

  async decrementEnemySubjectsArray(index: number): Promise<string> {
    this.enemyCounterArray[0].quantity--;
    this.enemySubjectsCounterArray[0].subjectQuantity.next(this.enemyCounterArray[0].quantity--);
    this.enemyCounterArray[index].quantity--;
    this.enemySubjectsCounterArray[index].subjectQuantity.next(this.enemyCounterArray[index].quantity--);

    return Promise.resolve(this.resolutionMessage);
  }

  getSingleCounter(index: number): Observable<number>  {

    return of(this.enemyCounterArray[index].quantity);
  }
}
