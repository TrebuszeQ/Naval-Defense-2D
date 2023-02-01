import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Skills } from '../character/interfaces/skills';
// interfaces
import { WarshipType } from '../character/interfaces/warship-type';
import { TorpedoType } from '../torpedo/Interfaces/torpedo-type';
import { WeaponType } from '../weapon/Interfaces/weapon-type';
import { Level } from './levels/interfaces/level';
// services
import { WarshipTypeService } from '../character/services/warship-type.service';
import { LevelService } from './levels/Services/level.service';
import { WarshipPositionService } from '../character/services/warship-position.service';
import { TorpedoTypeService } from '../torpedo/Services/torpedo-type.service';
import { WeaponService } from '../weapon/Services/weapon.service';
import { LevelTimingService } from './levels/Services/level-timing.service';
import { EnemyCounterService } from '../enemy-wrapper/Services/enemy-counter.service';
import { RightUiLogService } from './levels/Services/rightui-log.service';
// arrays
import { warshipTypeArray } from '../character/arrays/warship-types-array';

@Component({
  selector: 'app-level-wrapper',
  templateUrl: './level-wrapper.component.html',
  styleUrls: ['./level-wrapper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LevelWrapperComponent implements OnInit {

  resolutionMessage: string = "resolved";
  time: Date | null = null;
  level!: Level;

  rightUiLog: string = '';
  rightUiLogHidden: boolean = false;

  warship: WarshipType = warshipTypeArray[0];

  currentWeapon: WeaponType | null = null;
  currentWeaponAmmo: number | null = null;
  currentBarrelLife: number | null = null;
  weaponDetailsHidden: boolean = false;

  currentTorpedo: TorpedoType | null = null;
  torpedoDetailsHidden: boolean = false;

  warshipX: number = 0;
  speed: number = 0;
  crew: number = 0;
  armor: number = 0;
  warshipEndurance: number = 0;
  length: number = 0;

  skills: Skills[] | null = null;
  
  repairmentTime: number | null = null;

  allEnemyCounter: number = 0;

  warshipElement = document.getElementById('app-character');

  controller = new AbortController();
  signal = this.controller.signal;
  // warshipY: number = 0;
  constructor(private warshipTypeService: WarshipTypeService, private levelService: LevelService, private warshipPositionService: WarshipPositionService, private torpedoTypeService: TorpedoTypeService, private weaponService: WeaponService, private levelTimingService: LevelTimingService, private enemyCounterService: EnemyCounterService, private rightUiLogService: RightUiLogService) { }

  async ngOnInit(): Promise<string> {
    await this.getLevel();
    await this.setStartingWarshipX();
    await this.insertRighUiLogPRule();
    await this.getRightUiLogSubject();
    await this.setLevelTimingTime();
    await this.getLevelTimingTimeSubject();
    await this.getWarship();
    await this.setWarshipSpeed();
    // await this.getWarshipPosition();
    await this.getWarshipPositionSubject();
    await this.getLevelWidth();
    await this.getAllEnemyCounter();

    await this.setCurrentWeapon();
    await this.setCurrentTorpedo();
    await this.setWeaponAmmo();
    await this.setBarrelLife();

    return Promise.resolve(this.resolutionMessage);
  }

  async getLevel(): Promise<string> {
    const getLevelObserver = {
      next: (level: Level) => {
        this.level = level;
      },
      error: (error: Error) => {
        console.error(`getLevelObserver on level-wrapper.component faced an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getLevelObserver on level-wrapper.component completed.");
      // }
    }

    this.levelService.getSelectedLevel().subscribe(getLevelObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }
  
  async getWarship(): Promise<string> {
    const getWarshipObserver = {
      next: (warship: WarshipType) => {
        this.warship = warship;
      },
      error: (error: Error) => {
        console.error(`getWarshipObserver on level-wrapper.component faced an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getWarshipObserver on level-wrapper.component completed.");
      // }
    }

    this.warshipTypeService.getSelectedWarshipType().subscribe(getWarshipObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  // async getWarshipPosition(): Promise<string> {
  //   const getWarshipPositionObserver = {
  //     next: (warshipX: number) => {
  //       this.warshipX = warshipX;
  //     },
  //     error: (error: Error) => {
  //       console.error(`getWarshipPositionObserver on level-wrapper.component faced an issue: ${error}.`);
  //     },
  //     // complete: () => {
  //     //   console.log("getWarshipPositionObserver on level-wrapper.component completed.");
  //     // }
  //   }

  //   this.warshipPositionService.getWarshipPosition().subscribe(getWarshipPositionObserver);
  //   return Promise.resolve(this.resolutionMessage);
  // }

  async setStartingWarshipX(): Promise<string> {
    const levelElement = document.getElementById("level");
    const width = window.getComputedStyle(levelElement!).width;

    
    this.warshipX = this.level!.startingPosition * parseFloat(width) / 100;
    this.warshipPositionService.warshipX = this.warshipX;

    return Promise.resolve(this.resolutionMessage);
  }

  // async getStartingWarshipX(): Promise<string> {
  //   const getStartingWarshipXObserver = { 
  //     next: (warshipX: number) => {
  //       this.warshipX = warshipX;
  //     },
  //     error: (error: Error) => {
  //       console.error(`getStartingWarshipX on character.component encountered an error: ${error}`);
  //     },
  //   };
  //   this.warshipPositionService.getStartingWarshipX().subscribe(getStartingWarshipXObserver).unsubscribe();
  //   return Promise.resolve(this.resolutionMessage);
  // }

  async getWarshipPositionSubject(): Promise <string>{
    this.warshipPositionService.warshipXSubject.subscribe({
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      }
    });
    
    return Promise.resolve(this.resolutionMessage);
  }
  
  async setCurrentWeapon(): Promise<string> {
    if(this.warship.availableWeapons?.weapon != null) {
      this.currentWeapon = this.warship.availableWeapons.weapon[0];
    }
    return Promise.resolve(this.resolutionMessage);
  }

  async selectWeapon(weapon: WeaponType): Promise<string> {
    this.currentWeapon = weapon;

    // push to service
    this.weaponService.setCurrentWeapon(weapon);
    this.updateRighUiLogLocal(`${weapon.weaponName} selected`);
    this.setWeaponAmmo();

    return Promise.resolve(this.resolutionMessage);
  }

  async setCurrentTorpedo(): Promise<string> {
    if(this.warship.availableTorpedos?.torpedo != null) {
      this.currentTorpedo = this.warship.availableTorpedos.torpedo[0];
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async selectTorpedo(torpedo: TorpedoType): Promise<string> {
    this.currentTorpedo = torpedo;

    // push to service
    this.torpedoTypeService.setTorpedoType(torpedo);
    this.updateRighUiLogLocal(`${torpedo.torpedoName} selected`);

    return Promise.resolve(this.resolutionMessage);
  }

  async setWeaponAmmo(): Promise<string> {
    if(this.currentWeapon != null) {
      this.currentWeaponAmmo = this.currentWeapon!.ammoCapacity;
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async setBarrelLife(): Promise<string> {
    if(this.currentWeapon != null) {
      this.currentBarrelLife = this.currentWeapon.barrelLife;
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async showWeaponDetails(): Promise<string> {
    const weaponDetailsElement = document.getElementById("weaponDetailsWrapper");

    if(this.weaponDetailsHidden == false) {
      weaponDetailsElement!.className = "detailsWrapper hidden";
      this.weaponDetailsHidden = true;
    } else {
      weaponDetailsElement!.className = "detailsWrapper";
      this.weaponDetailsHidden = false;
    }
    return Promise.resolve(this.resolutionMessage);
  }

  async showTorpedoDetails(): Promise<string> {
    const torpedoDetailsElement = document.getElementById("torpedoDetailsWrapper");

    if(this.torpedoDetailsHidden == false) {
      torpedoDetailsElement!.className = "detailsWrapper hidden";
      this.torpedoDetailsHidden = true;
    }
    else {
      torpedoDetailsElement!.className = "detailsWrapper";
      this.torpedoDetailsHidden = false;
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async getLevelWidth(): Promise <string> {
    
    const levelElement = document.getElementById("level");
    const levelElementWidth = getComputedStyle(levelElement!).width;

    this.warshipPositionService.setMaxPosition(parseFloat(levelElementWidth) - this.warship.length);
    return Promise.resolve(this.resolutionMessage);
  }

  async updateWarshipMaximumMovement(): Promise <string> {
    const levelElementWidth = document.getElementById("level")!.style.getPropertyValue("width");

    return Promise.resolve(this.resolutionMessage);
  }

  async setLevelTimingTime(): Promise<string> {
    this.time = this.level.startingDate;
    this.levelTimingService.setLevelTime(this.level.startingDate);
    
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

  async setWarshipSpeed(): Promise<string> {
    this.warshipPositionService.setWarshipSpeed(this.warship.maxSpeed);

    return Promise.resolve(this.resolutionMessage);
  }

  async getAllEnemyCounter(): Promise<string> {
    this.enemyCounterService.enemyCounterArraySubjects[0].subjectQuantity.subscribe({
      next: (enemyCounter: number) => {
        this.allEnemyCounter = enemyCounter;
      },
      error: (error: Error) => {
        console.error(`getAllEnemyCounter() on level-wrapper encountered an error: ${error}.`);
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }

  async insertRighUiLogPRule(): Promise<string> {
    const righUiLogPRule: string = 
    `.righUiLogP {
      margin: 1% 2%;
    }
    `
    document.styleSheets[0].insertRule(righUiLogPRule);

    return Promise.resolve(this.resolutionMessage);
  }

  async getRightUiLogSubject(): Promise<string> {
    const rightUiLogElement = document.getElementById("rightUiLog");

    this.rightUiLogService.rightUiLogSubject.subscribe({
      next: (content: string) => {
        const li = document.createElement("li");
        li.className = "selectable";
        const p = document.createElement('p');
        p.className = "righUiLogP";
        const textNode = document.createTextNode(content);
        rightUiLogElement!.appendChild(li).appendChild(p).appendChild(textNode);

        li.addEventListener("click", () => {
          this.removeLogEntry(li);
        });
      }
    });
    return Promise.resolve(this.resolutionMessage);
  }

  async showRightUiLog(): Promise<string> {
    const rightUiLogElement = document.getElementById("rightUiLog");

    if(this.rightUiLogHidden == false) {
      rightUiLogElement!.className = "leftUiUl hidden";
      this.rightUiLogHidden = true;
    } else {
      rightUiLogElement!.className = "leftUiUl";
      this.rightUiLogHidden = false;
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async removeLogEntry(element: HTMLElement): Promise<string> {
    element.remove();

    return Promise.resolve(this.resolutionMessage);
  } 

  async updateRighUiLogLocal(content: string): Promise<string> {
    const rightUiLogElement = document.getElementById("rightUiLog");

    const li = document.createElement("li");
    li.className = "selectable";
    const p = document.createElement('p');
    p.className = "righUiLogP";
    const textNode = document.createTextNode(content);
    rightUiLogElement!.appendChild(li).appendChild(p).appendChild(textNode);

    li.addEventListener("click", () => {
      this.removeLogEntry(li);
    });
    
    return Promise.resolve(this.resolutionMessage);
  }
}
