import { Component, OnDestroy, OnInit } from '@angular/core';
// interfaces
import { Enemy } from '../../Interfaces/enemy';
import { EnemySkills } from '../../Interfaces/enemy-skills';
import { EnemyWeapon } from '../../Interfaces/enemy-weapon';
import { Levels } from 'src/app/level-wrapper/levels/interfaces/levels';

// arrays
import { enemyArray } from '../../Arrays/enemy-array';
import { enemyWeaponArray } from '../../Arrays/enemy-weapon-array';

// services
import { EnemyArrayService } from '../../Services/enemy-array.service';
import { WarshipPositionService } from 'src/app/character/services/warship-position.service';
import { LevelService } from 'src/app/level-wrapper/levels/Services/level.service';


@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent implements OnInit, OnDestroy {
  
  resolutionMessage: string = "resolved";

  enemyArray: Enemy[] | null = null;
  level: Levels | null = null;
  warshipX: number = 0;
  constructor(private enemyArrayService: EnemyArrayService, private warshipPositionService: WarshipPositionService, private levelService: LevelService) {

  }

  async ngOnInit(): Promise<string> {
    await this.getEnemyArray();
    await this.getWarshipPositionSubject();
    await this.getLevel();

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
        console.error(`getEnemyArrayObserver on enemy.component encountered an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getEnemyArrayObserver on enemy.component completed");
      // }
    }

    this.enemyArrayService.getEnemyArray().subscribe(getEnemyArrayObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipPositionSubject(): Promise<string> {
    this.warshipPositionService.warshipXSubject.subscribe({
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }
  
  async getLevel(): Promise<string> {
    const getLevelObserver = {
      next: (level: Levels) => {
        this.level = level;
      },
      error: (error: Error) => {
        console.error(`getLevelObserver on enemy.component encountered an issue: ${error}`);
      },
      // complete: () => {
      //   console.log("getLevelObserver on enemy.component completed.");
      // }
    };
    
    this.levelService.getSelectedLevel().subscribe(getLevelObserver).unsubscribe();

    return Promise.resolve(this.resolutionMessage);
  }
}
