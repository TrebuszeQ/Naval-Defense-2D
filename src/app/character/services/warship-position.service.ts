import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarshipPositionService {

  // warship position
  warshipX = 0;

  constructor() { }

  incrementRight(): Observable <number> {
    this.warshipX == 700 ? this.warshipX == 700 : this.warshipX += 2.5;
    return of(this.warshipX);
  }

  decrementLeft(): Observable <number> {
    this.warshipX == 0 ? this.warshipX == 0 : this.warshipX -= 2.5;
    return of(this.warshipX);
  }

  getWarshipPosition(): Observable <number> {
    return of(this.warshipX);
  }
}
