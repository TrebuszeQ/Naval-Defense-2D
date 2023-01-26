import { Component, OnDestroy, OnInit } from '@angular/core';
// pipes
import { RemoveSpacesPipe } from '../remove-spaces.pipe';
// interfaces
import { Enemy } from './Interfaces/enemy';
// arrays
// services
import { EnemyArrayService } from './Services/enemy-array.service';
import { EnemyCounterService } from './Services/enemy-counter.service';

@Component({
  selector: 'app-enemy-wrapper',
  templateUrl: './enemy-wrapper.component.html',
  styleUrls: ['./enemy-wrapper.component.css']
})
export class EnemyWrapperComponent implements OnInit, OnDestroy {
  
  resolutionMessage: string = "resolved";

  enemyArray: Enemy[] = [];

  allEnemyCounter: number = 0;

  constructor(private enemyArrayService: EnemyArrayService, private enemyCounterService: EnemyCounterService) {
  }
  
  async ngOnInit(): Promise<string> {
    await this.getEnemyArray();
    await this.getAllEnemyCounter();
    return Promise.resolve(this.resolutionMessage);
  }

  async ngOnDestroy(): Promise<string> {
    

    return Promise.resolve(this.resolutionMessage);
  }

  async getEnemyArray(): Promise<string> {
    const getEnemyArrayObserver = {
      next: (enemyArray: Enemy[]) => {
        this.enemyArray = enemyArray;
      },
      error: (error: Error) => {
        console.error(`getEnemyArrayObserver on enemy-wrapper.component encountered an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getEnemyArrayObserver on enemy.component completed");
      // }
    }

    this.enemyArrayService.getEnemyArray().subscribe(getEnemyArrayObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async getAllEnemyCounter(): Promise<string> {
    this.enemyCounterService.enemySubjectsCounterArray[0].subjectQuantity.subscribe({
      next: (enemyCounter: number) => {
        this.allEnemyCounter = enemyCounter;
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }
  
  async getSingleCounterOnce(name: string): Promise<number> {
    let singleCounter = 0;
    const getSingleCounterOnceObserver = {
      next: (counter: number) => {
        singleCounter = counter
      },
      error: (error: Error) => {
        console.error(`getSingleCounterOnceObserver on enemy-wrapper.component encountered an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getSingleCounterOnceObserver on enemt-wrapper.component completed.");
      // }
    }

    this.enemyCounterService.getSingleCounter(await this.searchForEnemyWithName(name)).subscribe(getSingleCounterOnceObserver).unsubscribe();

    return Promise.resolve(counter);
  }

  async spawnEnemy(enemy: Enemy): Promise<string> {
    const enemyElement = document.createElement("app-enemy");
    // modify this to return camelCase v
    const name = enemy.enemyName.replaceAll(' ', '_'); 

    enemyElement.id = `${name + this.getSingleCounterOnce(enemy.enemyName)}`;
    enemyElement.className = name;
    return Promise.resolve(this.resolutionMessage);
  }

  async searchForEnemyWithName(enemyName: string): Promise<number> {
    return this.enemyArray.findIndex((enemy: Enemy) => enemy.enemyName == enemyName);
  }
}
