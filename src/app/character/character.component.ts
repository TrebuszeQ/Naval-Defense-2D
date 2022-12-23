import { Component, OnInit } from '@angular/core';
// services
import { WaterService } from '../water/water.service';
import { TorpedoService } from './services/torpedo.service';
import { WarshipPositionService } from './services/warship-position.service';
import { WarshipTypeService } from './services/warship-type.service';


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
  
  warshipX: number = 0;

  warshipType = "basic";
  
  torpedoCount: number = 0;

  keyframeRight = new KeyframeEffect(
    this.warship!,
    [
      { 
        transform: `translateX(${this.warshipX})`, 
        easing: "linear",
      },
    ],
    {
      duration: 200, 
      fill: 'forwards',
    }
  )

  waterLevel = 0;

  constructor(private waterService: WaterService, private warshipPositionService: WarshipPositionService, private warshipTypeService: WarshipTypeService, private torpedoService: TorpedoService) { }

  async ngOnInit(): Promise<string> {
    // stylesheet
    this.stylesheet = document.styleSheets[0];

    this.level = document.getElementById("level");

    this.warship = document.getElementById("warship");
    await this.setWarshipType(this.warshipType);
    await this.placeWarshipOnWater();

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
      next: (rule: string) => this.stylesheet.insertRule(rule),
      error: (error: Error) => "warshipTypeObserver encountered an error" + error,
      // complete: () => console.log("warshipTypeObserver received complete"),
    }
    
    switch(name) {
      case "basic":
        this.warshipTypeService.getBasic().subscribe(warshipTypeObserver).unsubscribe();
        break;
    }

    return Promise.resolve("resolved");
  }

  async placeWarshipOnWater() {
    const waterObserver = {
      next: (array: number[]) => this.waterLevel = array[0],
      error: (error: Error) => console.error('waterObserver faced an error: ' + error),
      // complete: () => console.log('waterObserver received complete'),
    };
    this.waterService.getWaterLevels().subscribe(waterObserver).unsubscribe();


    this.warship!.style.gridRow = `${42 - this.waterLevel}`;
    
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

  async dropTorpedo() {
    const torpedoCountObserver = {
      next: (torpedoCount: number) => this.torpedoCount = torpedoCount,
      error: (error: Error) => "torpedoCountObserver faced an error" + error,
      // complete: () => "torpedoCountObserver received complete",
    }

    const torpedo = document.createElement("div");
    this.torpedoService.getTorpedoCount().subscribe(torpedoCountObserver).unsubscribe();

    torpedo.id = `torpedo${this.torpedoCount}`;
    torpedo.className = "torpedo";
    this.level!.appendChild(torpedo);

    return Promise.resolve("resolved");
  }
}
