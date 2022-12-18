import { Injectable } from '@angular/core';

import { Observable, observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaterService {


  gridRows = 26;
  gridColumns = 42;

  constructor() { }

  getWaterLevels(): Observable<number[]> {
    return of([this.gridRows, this.gridColumns]);
  }
}
