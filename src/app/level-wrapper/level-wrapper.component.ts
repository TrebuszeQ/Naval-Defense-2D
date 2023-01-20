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

  currentTorpedo: TorpedoType | null = null;

  warshipX: number = 0;
  
  speed: number = 0;
  crew: number = 0;
  armor: number = 0;
  warshipEndurance: number = 0;
  length: number = 0;

  skills: Skills[] | null = null;
  
  repairmentTime: number | null = null;


  time!: Date;

  warshipElement = document.getElementById('app-character');

  controller = new AbortController();
  signal = this.controller.signal;
  // warshipY: number = 0;
  constructor(private warshipTypeService: WarshipTypeService, private levelService: LevelService, private warshipPositionService: WarshipPositionService, private torpedoTypeService: TorpedoTypeService, private weaponService: WeaponService) { }

  async ngOnInit(): Promise<string> {
    await this.getLevel();
    await this.getWarship();
    await this.getWarshipPosition();
    
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

  async getWarshipPosition(): Promise<string> {
    const getWarshipPositionObserver = {
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      },
      error: (error: Error) => {
        console.error(`getWarshipPositionObserver on level-wrapper.component faced an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getWarshipPositionObserver on level-wrapper.component completed.");
      // }
    }

    this.warshipPositionService.getWarshipPosition().subscribe(getWarshipPositionObserver).unsubscribe();
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
}
