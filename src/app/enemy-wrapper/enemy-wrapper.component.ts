import { Component, OnDestroy, OnInit } from '@angular/core';

// interfaces
import { Enemy } from './Interfaces/enemy';
import { Level } from '../level-wrapper/levels/interfaces/level';
import { ActiveEnemy } from './Interfaces/active-enemy';
// arrays
// services
import { EnemyArrayService } from './Services/enemy-array.service';
import { EnemyCounterService } from './Services/enemy-counter.service';
import { LevelTimingService } from '../level-wrapper/levels/Services/level-timing.service';
import { LevelService } from '../level-wrapper/levels/Services/level.service';
import { WaterService } from '../level-wrapper/levels/water/Services/water.service';
import { RightUiLogService } from '../level-wrapper/levels/Services/rightui-log.service';
import { EnemyStatsService } from './Services/enemy-stats.service';
import { CombatService } from '../combat/Services/combat.service';

@Component({
  selector: 'app-enemy-wrapper',
  templateUrl: './enemy-wrapper.component.html',
  styleUrls: ['./enemy-wrapper.component.css']
})
export class EnemyWrapperComponent implements OnInit, OnDestroy {
  
  resolutionMessage: string = "resolved";
  time: Date | null = null;
  level: Level | null = null;
  // enemyArray: Enemy[] = [];
  waterLevel: number = 0;
  selectedActiveEnemy: ActiveEnemy | null = null;
  enemyToDestroy: ActiveEnemy | null = null;
  allEnemyCounter: number = 0;
  logFeedback: string = '';

  constructor(private enemyArrayService: EnemyArrayService, private enemyCounterService: EnemyCounterService, private levelTimingService: LevelTimingService, private levelService: LevelService, private waterService: WaterService, private rightUiLogService: RightUiLogService, private enemyStatsService: EnemyStatsService, private combatService: CombatService) {
  }
  
  async ngOnInit(): Promise<string> {
    await this.getLevel();
    await this.setLevelTimingTime();
    await this.getLevelTimingTimeSubject();
    // await this.getEnemyArray();
    await this.getAllEnemyCounter();
    await this.getEnemyToDestroySubject();

    await this.getWaterLevel();
    await this.addEnemyCssRule();
    await this.playScenario();

    return Promise.resolve(this.resolutionMessage);
  }

  async ngOnDestroy(): Promise<string> {
    

    return Promise.resolve(this.resolutionMessage);
  }

  async setLevelTimingTime(): Promise<string> {
    this.time = this.level!.startingDate;
    this.levelTimingService.setLevelTime(this.level!.startingDate);
    
    return Promise.resolve(this.resolutionMessage);
  }

  async getLevelTimingTimeSubject(): Promise<string> {
    this.levelTimingService.timeSubject.subscribe({
      next: (date: Date) => {
        this.time = date;
      }
    })
    
    return Promise.resolve(this.resolutionMessage);
  }

  async getAllEnemyCounter(): Promise<string> {
    this.enemyCounterService.enemyCounterArraySubjects[0].subjectQuantity.subscribe({
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
    const index = await this.enemyCounterService.findEnemyIndexByName(name);

    this.enemyCounterService.getSingleCounter(index).subscribe(getSingleCounterOnceObserver).unsubscribe();

    return Promise.resolve(singleCounter);
  }

  async getLevel(): Promise<string> {
    const getLevelObserver = {
      next: (level: Level) => {
        this.level = level;
      },
      error: (error: Error) => {
        console.error(`getLevelObserver on enemy-wrapper.component faced an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getLevelObserver on enemy-wrapper.component completed.");
      // }
    }

    this.levelService.getSelectedLevel().subscribe(getLevelObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async getWaterLevel(): Promise<string> {
    const waterObserver = {
      next: (array: number[]) => this.waterLevel = array[0],
      error: (error: Error) => console.error('waterObserver faced an error: ' + error),
      // complete: () => console.log('waterObserver received complete'),
    };
    this.waterService.getWaterLevels().subscribe(waterObserver).unsubscribe();
    
    return Promise.resolve("resolved");
  }

  async appendRightUiLogFeedback(): Promise<string> {
    this.rightUiLogService.updateRightUiLog(this.logFeedback);

    this.logFeedback = '';
    return Promise.resolve(this.resolutionMessage);
  }

  async playScenario(): Promise<string> {
    const scenario = this.level!.levelScenario;
    let i = 0;
    
    const scenarioInterval = setInterval(() => {
      if(i > scenario.length) {
        clearInterval(scenarioInterval);
        clearTimeout(scenarioTimeout);
      } 
      else if(i < scenario.length) {
        for(let j = 0; j < scenario[i].enemyArray.length; j++) {
            this.spawnEnemy(scenario[i].enemyArray[j]);
        } 
        i++;
      }
      
    }, this.level!.interval)

    const scenarioTimeout = setTimeout(() => {
      clearInterval(scenarioInterval);

    }, this.level!.timeLength);
    
    
    return Promise.resolve(this.resolutionMessage);
  }

  async addEnemyCssRule(): Promise<string> {
    document.styleSheets[0].insertRule(
      `.enemy {
          z-index: 8;
          display: block;
          position: absolute;
          margin: 0;
          padding: 0;
          object-fit: fill;
          background-color; gray;
      }
      `)

    return Promise.resolve(this.resolutionMessage);
  }
  
  async spawnEnemy(enemy: Enemy): Promise<string> {
    const enemyElement = document.createElement("app-enemy");
    const enemyName = enemy.enemyName;
    const nameNew = enemy.cssMainStyleName; 
    
    
    if(await this.getSingleCounterOnce(enemyName) == 0) {
      const rule = `.${enemy.cssMainStyleName} {
        grid-row: ${42 - this.waterLevel};
        width: ${enemy.length}px;
        height: ${enemy.height}px;
        ${await this.ifNoBackgroundImage(enemy.backgroundImagePath)};
      }`;
      document.styleSheets[0].insertRule(rule); 
    }

    enemyElement.id = `${nameNew + await this.getSingleCounterOnce(enemyName)}`;
    enemyElement.className = `${nameNew} enemy hooverableObject`;

    const enemyWrapperElement = document.getElementById("enemyWrapper");
    enemyWrapperElement!.appendChild(enemyElement);
    
    const index = await this.enemyArrayService.getEnemyIndexByName(enemy.enemyName);
    this.enemyCounterService.incrementEnemySubjectsArray(index);

    const enemyStatsItem: ActiveEnemy = {elementID: `${nameNew + await this.getSingleCounterOnce(enemyName)}`, enemyType: enemy, x: 0, y: (42 - this.waterLevel), endurance: enemy.endurance, distance: 0};
    this.enemyStatsService.appendActiveEnemyArray(enemyStatsItem)
    
    this.logFeedback += `${enemy.enemyName} detected`;

    await this.appendRightUiLogFeedback();

    // wip
    // const firstClickListener = enemyElement.addEventListener("click", (event: MouseEvent) => {
    //   this.selectEnemy(enemyStatsItem);
    // });

    return Promise.resolve(this.resolutionMessage);
  }

  async getEnemyToDestroySubject(): Promise<string> {
    this.enemyStatsService.enemyToDestroy.subscribe({
      next: (enemyToDestroy: ActiveEnemy) => {
        this.enemyToDestroy = enemyToDestroy;
      },
      error: (error: Error) => {
        console.error(`getEnemyToDestroySubject() encountered an error: ${error}.`);
      }
    })

    return Promise.resolve(this.resolutionMessage);
  }

  async destroyEnemy(): Promise<string> {
    const element = document.getElementById(this.enemyToDestroy!.elementID);
    document.removeChild(element!);

    return Promise.resolve(this.resolutionMessage);
  }

  async ifNoBackgroundImage(path: string | null) {
    if(path == null) {
      return "background-color: gray"
    }
    else return path;
  }

  async selectEnemy(selectedEnemy: ActiveEnemy): Promise<string> {
    this.selectedActiveEnemy = selectedEnemy;
    this.enemyStatsService.selectEnemy(selectedEnemy);

    this.logFeedback = `Aiming ${selectedEnemy.elementID}`;

    await this.appendRightUiLogFeedback();
    // this.combatService.startCombatBySelection();

    return Promise.resolve(this.resolutionMessage);
  }
}
