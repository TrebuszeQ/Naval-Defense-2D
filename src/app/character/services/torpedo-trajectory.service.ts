import { Injectable } from '@angular/core';
// interfaces
import { TorpedoType } from '../interfaces/torpedo-type';
import { WarshipType } from '../interfaces/warship-type';

@Injectable({
  providedIn: 'root'
})
export class TorpedoTrajectoryService {

  constructor() { }

  moveDown(level: HTMLElement, gridRow: number, warshipType: WarshipType, warshipX: number, torpedoId: HTMLDivElement, torpedoType: TorpedoType) {
    // let torpedeGridRow: number = gridRow += 1;
    let torpedeGridRow = gridRow + 1;
    let top = 100/42 * torpedeGridRow;
    const marginLeft: number = ((warshipType.width / 2) - (torpedoType.width / 2) + (warshipX / 100 * warshipType.width));
    torpedoId.style.top = `${top}%`;
    // console.log(marginLeft);

    torpedoId.style.marginLeft = `${marginLeft}%`;

    const drop = setInterval(() => {
      // console.log(torpedoId);
      torpedeGridRow++;
      let top = 100/42 * torpedeGridRow;
      torpedoId.style.top = `${top}%`;
      console.log(top);

      torpedoId.animate(
        [
          {
            top: top + '%',
            easing: "linear"
          }
        ],
        {
          duration: 300,
          fill: "forwards"
        }
      );

      if(torpedeGridRow == 42) {
        clearInterval(drop);
        level.removeChild(torpedoId);
      }
    }, torpedoType.speed)
  }
}