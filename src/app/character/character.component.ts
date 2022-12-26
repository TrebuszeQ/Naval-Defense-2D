import { Component, OnInit } from '@angular/core';
// services
import { WaterService } from '../water/water.service';
import { TorpedoTypeService } from './services/torpedo-type.service';
import { TorpedoService } from './services/torpedo.service';
import { WarshipPositionService } from './services/warship-position.service';
import { WarshipTypeService } from './services/warship-type.service';
import { TorpedoTrajectoryService } from './services/torpedo-trajectory.service';
// interfaces
import { TorpedoType } from './interfaces/torpedo-type';
import { WarshipType } from './interfaces/warship-type';



@Component({
  selector: 'app-character',
  // templateUrl: './character.component.html',
  template: '',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  level = document.getElementById("level");

  stylesheet = document.styleSheets[0];

  warship = document.getElementById("warship");
  
  gridRow: number = 0;

  warshipX: number = 0;

  warshipType!: WarshipType;

  torpedoType: any;

  torpedoCount: number = 0;

  waterLevel = 0;

  constructor(private waterService: WaterService, private warshipPositionService: WarshipPositionService, private warshipTypeService: WarshipTypeService, private torpedoService: TorpedoService, private torpedoTypeService: TorpedoTypeService, private torpedoTrajectoryService: TorpedoTrajectoryService) { }

  async ngOnInit(): Promise<string> {
    // stylesheet
    this.stylesheet = document.styleSheets[0];

    this.level = document.getElementById("level");

    this.warship = document.getElementById("warship");
    // temporarily hardocded warshiptype string
    await this.setWarshipType("basic");
    await this.placeWarshipOnWater();

    // hardcoded string is a placeholder
    await this.setTorpedoType("basic"); 

    // warship position
    this.warshipX = 0;
  
    // listening for keyboardEvent API
    document.addEventListener("keydown", (event) => {
      // console.log(event.key);
      this.warshipActions(event.key);
    });

    return Promise.resolve("resolved");
  }
  
  // makes warship default size
  async setWarshipType(name: string) {
    
    const warshipTypeObserver = {
      next: (warshipType: WarshipType) => { 
        const rule = `
        #warship {
          z-index: 8;
          display: block;
          position: absolute;
          margin: 0;
          padding: 0;
          width: ${warshipType!.width}%;
          height: ${warshipType!.height}px;
          background-image: ${warshipType!.backgroundImage};
          background-color: rgb(101, 101, 101);
        }`;
        this.stylesheet.insertRule(rule);
        this.warshipType = warshipType;
      },
      error: (error: Error) => "warshipTypeObserver encountered an error" + error,
      // complete: () => console.log("warshipTypeObserver received complete"),
    }
    
    this.warshipTypeService.getWarshipType(name).subscribe(warshipTypeObserver).unsubscribe();

    return Promise.resolve("resolved");
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
        await this.dropTorpedo();
        break;
    }

    return Promise.resolve("resolved");
  }

  async moveCharacterRightGrid() {
    this.warship!.animate(
      [
        { 
          transform: `translateX(${this.warshipX}%)`,
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
          transform: `translateX(${this.warshipX}%)`,
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
    const torpedoTypeObserver = {
      next: (torpedoType: TorpedoType | undefined) => this.torpedoType = torpedoType,
      error: (error: Error) => "torpedoTypeObserver faced an error" + error,
      // complete: () => "torpedoTypeObserver receiver complete"
    }

      // export interface TorpedoType {
      // name: string,
      // width: string,
      // height: string,
      // backgroundImage?: string | HTMLImageElement,
      // damage: number,
      // area: number
      // }

    this.torpedoTypeService.getTorpedoType(name).subscribe(torpedoTypeObserver).unsubscribe()

    const torpedoRule = `
    .torpedo {
      z-index: inherit;
      display: block;
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

  async dropTorpedo() {
    const torpedoCountObserver = {
      next: (torpedoCount: number) => this.torpedoCount = torpedoCount,
      error: (error: Error) => "torpedoCountObserver faced an error" + error,
      // complete: () => "torpedoCountObserver received complete",
    };

    this.torpedoService.getTorpedoCount().subscribe(torpedoCountObserver).unsubscribe();

    const torpedo = document.createElement("div");
    torpedo.id = `torpedo${this.torpedoType.name + this.torpedoCount}`;
    torpedo.className = `torpedo ${this.torpedoType.name}`;

    this.level!.appendChild(torpedo);

    this.torpedoTrajectoryService.moveDown(this.level!, this.gridRow, this.warshipType, this.warshipX, torpedo, this.torpedoType);

    // this.level!.removeChild(torpedo);

    return Promise.resolve("resolved");
  }
}
