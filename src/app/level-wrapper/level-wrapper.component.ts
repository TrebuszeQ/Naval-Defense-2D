import { Component, OnInit } from '@angular/core';
import { Skills } from '../character/interfaces/skills';
// interfaces
import { WarshipType } from '../character/interfaces/warship-type';
import { TorpedoType } from '../torpedo/Interfaces/torpedo-type';
import { WeaponType } from '../weapon/Interfaces/weapon-type';
import { Levels } from './levels/interfaces/levels';
// services
import { WarshipTypeService } from '../character/services/warship-type.service';
import { LevelService } from './levels/Services/level.service';
import { WarshipPositionService } from '../character/services/warship-position.service';
import { TorpedoTypeService } from '../torpedo/Services/torpedo-type.service';
import { WeaponService } from '../weapon/Services/weapon.service';
// arrays
import { warshipTypeArray } from '../character/arrays/warship-types-array';
import { LevelTimingService } from './levels/Services/level-timing.service';




@Component({
  selector: 'app-level-wrapper',
  templateUrl: './level-wrapper.component.html',
  styleUrls: ['./level-wrapper.component.css']
})
export class LevelWrapperComponent implements OnInit {

  resolutionMessage: string = "resolved";

  level!: Levels;

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


  time: Date | null = null;

  warshipElement = document.getElementById('app-character');

  controller = new AbortController();
  signal = this.controller.signal;
  // warshipY: number = 0;
  constructor(private warshipTypeService: WarshipTypeService, private levelService: LevelService, private warshipPositionService: WarshipPositionService, private torpedoTypeService: TorpedoTypeService, private weaponService: WeaponService, private levelTimingService: LevelTimingService) { }

  async ngOnInit(): Promise<string> {
    await this.getLevel();
    await this.setLevelTimingTime();
    await this.getLevelTimingTimeSubject();
    await this.getWarship();
    await this.setWarshipSpeed();
    // await this.getWarshipPosition();
    await this.getWarshipPositionSubject();
    await this.getLevelWidth();


    await this.setCurrentWeapon();
    await this.setCurrentTorpedo();
    await this.setWeaponAmmo();
    await this.setBarrelLife();

    return Promise.resolve(this.resolutionMessage);
  }

  async getLevel(): Promise<string> {
    const getLevelObserver = {
      next: (level: Levels) => {
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
}
