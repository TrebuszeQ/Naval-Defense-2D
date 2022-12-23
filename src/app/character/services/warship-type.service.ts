import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// arrays
import { warshipTypeArray } from '../arrays/warship-types-array';

@Injectable({
  providedIn: 'root'
})
export class WarshipTypeService {

  constructor() { }

  getBasic(): Observable<string> {
    // warshipTypeArray[0]
    const rule = `
    #warship {
      z-index: 8;
      display: block;
      position: absolute;
      margin: 0;
      padding: 0;
      width: ${warshipTypeArray[0].width};
      height: ${warshipTypeArray[0].height};
      background-color: rgb(101, 101, 101);
    }`;
    return of(rule);
  }
}
