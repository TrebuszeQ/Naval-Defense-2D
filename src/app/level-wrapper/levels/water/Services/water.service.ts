import { Injectable } from '@angular/core';

import { Observable, observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaterService {


  gridRows = 30;
  gridColumns = 42;

  gridRowsSubject = new Subject<number>();
  gridColumnsSubject = new Subject<number>();

  constructor() { }

  getWaterLevels(): Observable<number[]> {
    return of([this.gridRows, this.gridColumns]);
  }
}
