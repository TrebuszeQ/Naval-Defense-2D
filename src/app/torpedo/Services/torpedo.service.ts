import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TorpedoService {

  torpedoCount = 0;

  constructor() { }
  
  getTorpedoCount(): Observable <number> {
    // torpedoCount counter
    // console.log(`Torpedo count on service: ${this.torpedoCount}`);

    return of (this.torpedoCount);
  }

  incrementTorpedoCount(): Promise<string> {
    this.torpedoCount += 1;

    return Promise.resolve("resolved");
  }

  decrementTorpedoCount(): Promise<string> {
    this.torpedoCount -= 1;
    // after decrement counter
    // console.log(`After decrement ${this.torpedoCount}`);

    return Promise.resolve("string");
  }
}
