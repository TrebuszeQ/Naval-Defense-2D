import { Injectable } from '@angular/core';
// interfaces
import { TorpedoType } from '../interfaces/torpedo-type';
import { WarshipType } from '../interfaces/warship-type';
import { TorpedoService } from './torpedo.service';

@Injectable({
  providedIn: 'root'
})
export class TorpedoTrajectoryService {

  constructor(private torpedoService: TorpedoService) { }

  async moveDown(level: HTMLElement, gridRow: number, warshipType: WarshipType, warshipX: number, torpedoId: HTMLDivElement, torpedoType: TorpedoType) {
    // let torpedeGridRow: number = gridRow += 1;
    let torpedeGridRow = gridRow + 1;
    let top: number = 100/42 * torpedeGridRow;
    const marginLeft: number = ((warshipType.width / 2) - (torpedoType.width / 2) + (warshipX / 100 * warshipType.width));

    // console.log(marginLeft);

    torpedoId.style.marginLeft = `${marginLeft}%`;

    // create torpedo
    await this.appendLevelWithTorpedo(level, torpedoId, top);

    // console.log("set");
    const drop = setInterval(() => {
      top = 100/42 * torpedeGridRow++;
      // torpedoId counter
      // console.log(torpedoId);
      
      // top counter
      // console.log(top);
      const animation: Animation = torpedoId.animate(
        [
          {
            top: top + '%',
            easing: "linear"
          }
        ],
        {
          duration: torpedoType.speed,
          fill: "forwards"
        }
      );
      if (torpedeGridRow == 42) {
        clearInterval(drop);
        
        this.removeTorpedo(level, torpedoId).then(() => {
          this.updateTorpedoCount();
        })
      }
      else {
        animation;
      } 
    }, torpedoType.speed);
    return Promise.resolve(drop);
  }

  removeTorpedo(level: HTMLElement, torpedoId: HTMLDivElement) {
    // remove torpedo
    level!.removeChild(torpedoId);

    return Promise.resolve("resolved");  
  }

  appendLevelWithTorpedo(level: HTMLElement, torpedoId: HTMLDivElement, top: number) {
    torpedoId!.style.top = `${top}%`;
    level!.appendChild(torpedoId);
    
    return Promise.resolve("resolved");
  }

  async updateTorpedoCount() {
    this.torpedoService.decrementTorpedoCount();

    return Promise.resolve("resolved");
  }
}