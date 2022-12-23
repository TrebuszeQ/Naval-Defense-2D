import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TorpedoService {

  torpedoCount = 0;

  constructor() { }
  
  getTorpedoCount(): Observable <number> {
    this.torpedoCount += 1;
    return of (this.torpedoCount);
  }
}
