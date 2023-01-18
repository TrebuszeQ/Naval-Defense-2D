import { Injectable, OnInit } from '@angular/core';

// interfaces
import { TorpedoType } from '../../torpedo/Interfaces/torpedo-type';
import { WarshipType } from 'src/app/character/interfaces/warship-type';

// services
import { TorpedoService } from './torpedo.service';
import { WarshipPositionService } from 'src/app/character/services/warship-position.service';
import { WaterService } from 'src/app/level-wrapper/levels/water/Services/water.service';
import { WarshipTypeService } from 'src/app/character/services/warship-type.service';
import { TorpedoTypeService } from './torpedo-type.service';

@Injectable({
  providedIn: 'root'
})
export class TorpedoTrajectoryService implements OnInit{

  gridRow: number = 0;

  torpedoGridRow = this.gridRow + 1;

  warshipType!: WarshipType;

  torpedoType!: TorpedoType | undefined;

  warshipX: number = 0;

  top: number = 100/42 * this.torpedoGridRow;

  level = document.getElementById("level");

  constructor(private waterService: WaterService, private warshipTypeService: WarshipTypeService, private torpedoTypeService: TorpedoTypeService,  private warshipPositionService: WarshipPositionService, private torpedoService: TorpedoService) {
    this.level = document.getElementById("level");
    this.ngOnInit();
   }

  async ngOnInit() {
    this.level = document.getElementById("level");
    await this.getWaterLevel();
    await this.getWarshipType();
    await this.getTorpedoType();
    await this.getWarshipPosition();
    
    return Promise.resolve("resolved");
  }

  async getWaterLevel() {
    const waterLevelObserver = {
      next: (array: number[]) => {
        this.gridRow = array[0];
      },
      error: (error: Error) => {
        console.error(`waterLevelObserer from torpedo-trajectory service faced an error: ${error}.`);
      }
    }

    this.waterService.getWaterLevels().subscribe(waterLevelObserver).unsubscribe();
  }

  async getWarshipType() {
    const warshipTypeObserver = {
      next: (name: WarshipType) => {
        this.warshipType = this.warshipType;
      },
      error: (error: Error) => {
        console.error(`warshipTypeObserver from torpedo-trajectory service faced an error: ${error}`);
      }
    }

    this.warshipTypeService.getSelectedWarshipType().subscribe(warshipTypeObserver).unsubscribe();
  }

  async getTorpedoType() {
    const torpedoTypeObserver = {
      next: (torpedoType: TorpedoType | undefined) => {
        this.torpedoType = torpedoType;
      },
      error: (error: Error) => {
        console.error(`torpedoTypeObserver from torpedo-trajectory service faced an error: ${error}.`);
      }
    }


    this.torpedoTypeService.getTorpedoType().subscribe(torpedoTypeObserver).unsubscribe();
  }

  // async moveDown(level: HTMLElement, gridRow: number, warshipType: WarshipType, warshipX: number, torpedoId: HTMLDivElement, torpedoType: TorpedoType) {
  //   // let torpedeGridRow: number = gridRow += 1;
  //   let torpedeGridRow = gridRow + 1;
  //   let top: number = 100/42 * torpedeGridRow;
  //   const marginLeft: number = ((warshipType.width / 2) - (torpedoType.width / 2) + (warshipX / 100 * warshipType.width));
  //   let counter = 0;

  //   // console.log(marginLeft);

  //   torpedoId.style.marginLeft = `${marginLeft}%`;

  //   // create torpedo
  //   await this.appendLevelWithTorpedo(level, torpedoId, top);

  //   // console.log("set");
  //   const drop = setInterval(() => {
  //     top = 100/42 * torpedeGridRow++;
  //     // torpedoId counter
  //     // console.log(torpedoId);
      
  //     // top counter
  //     // console.log(top);
  //     if (torpedeGridRow == 42) {
  //       clearInterval(drop);
        
  //       this.removeTorpedo(level, torpedoId).then(() => {
  //         this.updateTorpedoCount();
  //       })
  //     } 
  //     else if (counter == 0) {
  //       counter++;
  //       torpedoId.animate(
  //         [
  //           {
  //             top: top + '%',
  //             easing: "ease-out",
  //             visibility: "visible",
  //           }
  //         ],
  //         {
  //           duration: 1,
  //           fill: "forwards"
  //         }
  //       )
  //     }
  //     else {
  //       torpedoId.animate(
  //         [
  //           {
  //             top: top + '%',
  //             easing: "linear",
  //           }
  //         ],
  //         {
  //           duration: torpedoType.speed,
  //           fill: "forwards"
  //         }
  //       )
  //     }
  //   }, torpedoType.speed);
  //   return Promise.resolve(drop);
  // }

  async dropTheTorpedo(torpedoId:HTMLDivElement) {
    await this.setDroppingInterval(torpedoId);
  }

  async setDroppingInterval(torpedoId: HTMLDivElement) {
    let counter = 0;
    const drop = setInterval(() => {
      this.top = 100/42 * this.torpedoGridRow++;
      // torpedoId counter
      // console.log(torpedoId);
      
      // top counter
      // console.log(top);
      if (this.torpedoGridRow == 42) {
        clearInterval(drop);
        
        this.removeTorpedo(this.level!, torpedoId).then(() => {
          this.updateTorpedoCount();
        })
      } 
      else if (counter == 0) {
        counter++;
        torpedoId.animate(
          [
            {
              top: top + '%',
              easing: "ease-out",
              visibility: "visible",
            }
          ],
          {
            duration: 1,
            fill: "forwards"
          }
        )
      }
      else {
        torpedoId.animate(
          [
            {
              top: top + '%',
              easing: "linear",
            }
          ],
          {
            duration: this.torpedoType!.speed,
            fill: "forwards"
          }
        )
      }
    }, this.torpedoType!.speed);
    return Promise.resolve(drop);
  }

  removeTorpedo(level: HTMLElement, torpedoId: HTMLDivElement) {
    // remove torpedo
    level!.removeChild(torpedoId);

    return Promise.resolve("resolved");  
  }

  async appendLevelWithTorpedo(level: HTMLElement, torpedoId: HTMLDivElement, top: number) {
    torpedoId!.style.top = `${top}%`;
    level!.appendChild(torpedoId);
    // console.log("appended");
    return Promise.resolve("resolved");
  }

  async updateTorpedoCount() {
    this.torpedoService.decrementTorpedoCount();

    return Promise.resolve("resolved");
  }

  async getWarshipPosition() {
    const warshipPositionObserver = {
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      },
      error: (error: Error) => {
        console.error(`warshipPositionObserver from torpedo-trajectory service faced an error: ${error}`);
      }
    }

    this.warshipPositionService.getWarshipPosition().subscribe(warshipPositionObserver).unsubscribe();
  }
}