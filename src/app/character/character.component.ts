import { Component, OnInit } from '@angular/core';
// services
import { WaterService } from '../level-wrapper/levels/water/Services/water.service';
import { TorpedoTypeService } from '../torpedo/Services/torpedo-type.service';
import { TorpedoService } from '../torpedo/Services/torpedo.service';
import { WarshipPositionService } from './services/warship-position.service';
import { WarshipTypeService } from './services/warship-type.service';
import { TorpedoTrajectoryService } from '../torpedo/Services/torpedo-trajectory.service';
import { LevelService } from '../level-wrapper/levels/Services/level.service';
// interfaces
import { TorpedoType } from '../torpedo/Interfaces/torpedo-type';
import { WarshipType } from './interfaces/warship-type';
import { Level } from '../level-wrapper/levels/interfaces/level';
// components
import { TorpedoComponent } from '../torpedo/torpedo.component';
import { WeaponComponent } from '../weapon/weapon.component';




@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  resolutionMessage: string = "resolved";
  levelElement = document.getElementById("level");
  stylesheet = document.styleSheets[0];
  warship = document.getElementById("warship");
  
  level: Level | null = null;

  gridRow: number = 0;

  warshipX: number = 0;

  warshipType: WarshipType | null = null;

  torpedoType: any;

  torpedoCount: number = 0;

  waterLevel = 0;

  constructor(private waterService: WaterService, private levelService: LevelService, private warshipPositionService: WarshipPositionService, private warshipTypeService: WarshipTypeService, private torpedoService: TorpedoService, private torpedoTypeService: TorpedoTypeService, private torpedoTrajectoryService: TorpedoTrajectoryService) { }

  async ngOnInit(): Promise<string> {
    // stylesheet
    this.stylesheet = document.styleSheets[0];
    this.levelElement = document.getElementById("level");
    this.warship = document.getElementById("warship");
    
    await this.getLevel();
    await this.getStartingWarshipX();
    await this.getWarshipType();
    await this.placeWarshipOnWater();

    // // hardcoded string is a placeholder
    // await this.setTorpedoType(); 
  
    // listening for keyboardEvent API
    document.addEventListener("keydown", (event) => {
      // console.log(event.key);
      this.warshipActions(event.key);
    });

    return Promise.resolve(this.resolutionMessage);
  }
  
  async getLevel(): Promise<string> {
    const getLevelObserver = {
      next: (level: Level) => {
        this.level = level;
      },
      error: (error: Error) => {
        console.error(`getLevelObserver on character.component faced an issue: ${error}.`);
      }
      // complete: () => {
      //   console.log("getLevelObserver on character.component completed.");
      // }
    }

    this.levelService.getSelectedLevel().subscribe(getLevelObserver).unsubscribe();

    return Promise.resolve(this.resolutionMessage);
  }

  async getStartingWarshipX(): Promise<string> {
    const getStartingWarshipXObserver = { 
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      },
      error: (error: Error) => {
        console.error(`getStartingWarshipX on character.component encountered an error: ${error}`);
      },
    };
    this.warshipPositionService.getStartingWarshipX().subscribe(getStartingWarshipXObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipType() {
    
    const warshipTypeObserver = {
      next: (warshipType: WarshipType) => { 
        const rule = `
        #warship {
          z-index: 8;
          display: block;
          position: absolute;
          margin: 0;
          padding: 0;
          transform: translateX(${this.warshipX}px);
          width: ${warshipType!.length}px;
          height: ${warshipType!.height}px;
          background-image: url(${warshipType!.backgroundImagePath});
          background-color: rgb(101, 101, 101);
        }`;
        this.stylesheet.insertRule(rule);
        this.warshipType = warshipType;
      },
      error: (error: Error) => "warshipTypeObserver encountered an error" + error,
      // complete: () => console.log("warshipTypeObserver received complete"),
    }
    
    this.warshipTypeService.getSelectedWarshipType().subscribe(warshipTypeObserver).unsubscribe();

    return Promise.resolve(this.resolutionMessage);
  }

  async placeWarshipOnWater() {
    const waterObserver = {
      next: (array: number[]) => this.waterLevel = array[0],
      error: (error: Error) => console.error('waterObserver faced an error: ' + error),
      // complete: () => console.log('waterObserver received complete'),
    };
    this.waterService.getWaterLevels().subscribe(waterObserver).unsubscribe();

    this.gridRow = 42 - this.waterLevel;
    this.warship!.style.gridRow = `${this.gridRow}`;
    
    return Promise.resolve("resolved");
  }

  async warshipActions(key: string) {
    const warshipPositionObserver = {
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      },
      error: (error: Error) => console.error("warshipPositionObserver faced an error: " + error),
      // complete: () => console.log("Observer received complete.")
    };

    switch(key) {
      case "ArrowRight":
        this.warshipPositionService.incrementRight().subscribe(warshipPositionObserver).unsubscribe();
        await this.moveCharacterRightGrid();
        break;
      
      case "ArrowLeft":
        this.warshipPositionService.decrementLeft().subscribe(warshipPositionObserver).unsubscribe();
        await this.moveCharacterRightGrid();
        break;

      case " ":
        // await this.dropTorpedo2();
        break;
    }

    return Promise.resolve("resolved");
  }

  async moveCharacterRightGrid() {
    this.warship!.animate(
      [
        { 
          transform: `translateX(${this.warshipX}px)`,
          easing: "linear",
        }
      ], 
      {
        fill: "forwards",
        duration: 200,
      }

    )
    return Promise.resolve("resolved");
  }

  async moveCharacterLeftGrid() {
    this.warship!.animate(
      [
        { 
          transform: `translateX(${this.warshipX}px)`,
          easing: "linear",
        }
      ], 
      {
        fill: "forwards",
        duration: 200,
      }

    )
    return Promise.resolve("resolved");
  }

  async setTorpedoType(name: string) {

    const torpedoRule = `
    .torpedo {
      z-index: inherit;
      display: block;
      visibility: hidden;
      position: absolute;
      margin: 0;
      padding: 0;
      background-color: rgb(23, 54, 53);
    }`

    const torpedoTypeRule = `
    .${name} {
      width: ${this.torpedoType!.width}%;
      height: ${this.torpedoType!.height}%;
      background-image: ${this.torpedoType?.backgroundImage};
    }`

    // console.log(torpedoTypeRule);

    this.stylesheet.insertRule(torpedoRule);
    this.stylesheet.insertRule(torpedoTypeRule);
    
    return Promise.resolve("resolved");
  }

  // async dropTorpedo() {
    
  //   let torpedoCount = await this.checkTorpedoCount();
  //   if(torpedoCount < this.torpedoType.limit) {
  //     // increment torpedoService torpedoCount
  //     this.torpedoService.incrementTorpedoCount();

  //     let torpedo = await this.setTorpedoStartingPosition();
  //     await this.torpedoTrajectoryService.dropTheTorpedo(this.level!, this.gridRow, this.warshipType, this.warshipX, torpedo, this.torpedoType);
  //     // await this.removeTorpedo(torpedo);
  //   }

  //   return Promise.resolve("resolved");
  // }

  async dropTorpedo2() {
    
    await this.checkTorpedoCount();
    if(this.torpedoCount < this.torpedoType.limit) {
      // increment torpedoService torpedoCount
      this.torpedoService.incrementTorpedoCount();

      let torpedo = await this.setTorpedoStartingPosition();
      await this.torpedoTrajectoryService.dropTheTorpedo(torpedo);
      // await this.removeTorpedo(torpedo);
    }

    return Promise.resolve("resolved");
  }

  async checkTorpedoCount() {
    let torpedoCountLocal: number = 0;
    const torpedoCountObserver = {
      next: (torpedoCount: number) => this.torpedoCount = torpedoCount,
      error: (error: Error) => "torpedoCountObserver faced an error" + error,
      // complete: () => "torpedoCountObserver received complete",
    };

    this.torpedoService.getTorpedoCount().subscribe(torpedoCountObserver).unsubscribe();

    return Promise.resolve("resolved");
  }

  async setTorpedoStartingPosition() {
    const torpedo = document.createElement("div");
    torpedo.id = `torpedo${this.torpedoType.name + this.torpedoCount}`;
    torpedo.className = `torpedo ${this.torpedoType.name}`;
    // console.log("set");
    return Promise.resolve(torpedo);
  }

  async appendLevelWithTorpedo(level: HTMLElement, torpedoId: HTMLDivElement, top: number) {
    torpedoId!.style.top = `${top}%`;
    level!.appendChild(torpedoId);
    // console.log("appended");
    return Promise.resolve("resolved");
  }

  // async removeTorpedo(torpedo: HTMLDivElement) {
  //   this.level!.removeChild(torpedo);

  //   // decrement torpedoService torpedoCount
  //   this.updateTorpedoCount();
  //   return Promise.resolve("resolved");
  // }

  // async updateTorpedoCount() {
  //   this.torpedoService.decrementTorpedoCount().then((message: string) => {
  //     console.log(message);
  //   });

  //   return Promise.resolve("resolved");
  // }
}
