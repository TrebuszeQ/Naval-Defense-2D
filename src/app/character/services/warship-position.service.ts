import { Injectable } from '@angular/core';
// rxjs
import { Observable, of, Subject } from 'rxjs';
// interfaces
import { Level } from 'src/app/level-wrapper/levels/interfaces/level';
// services
import { LevelService } from 'src/app/level-wrapper/levels/Services/level.service';

@Injectable({
  providedIn: 'root'
})
export class WarshipPositionService {

  resolutionMessage = "resolved";
  warshipX = 0;
  maxPosition = 0;
  speedFactor = 2.5;
  warshipXSubject = new Subject<number>();
  level: Level | null = null;

  constructor() {}

  getStartingWarshipX(): Observable<number> {
    return of(this.warshipX);
  }

  incrementRight(): Observable <number> {
    this.warshipX >= this.maxPosition - 5 ? this.warshipX == this.maxPosition - 5 : this.warshipX += this.speedFactor;
    
    this.warshipXSubject.next(this.warshipX);

    return of(this.warshipX);
  }

  decrementLeft(): Observable <number> {
    this.warshipX <= 5 ? this.warshipX == 5 : this.warshipX -= this.speedFactor;

    this.warshipXSubject.next(this.warshipX);

    return of(this.warshipX);
  }

  getWarshipPosition(): Observable <number> {
    return of(this.warshipX);
  }

  async setWarshipSpeed(speed: number): Promise <string> {
    this.speedFactor = (speed * 0.27777777777806 / 31);

    return Promise.resolve(this.resolutionMessage);
  }

  async setMaxPosition(width: number): Promise <string> {
    this.maxPosition = width;

    return Promise.resolve(this.resolutionMessage);
  }
}
