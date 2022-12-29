import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// arrays
import { warshipTypeArray } from '../arrays/warship-types-array';
// interface
import { WarshipType } from '../interfaces/warship-type';

@Injectable({
  providedIn: 'root'
})
export class WarshipTypeService {

  warshipName: string = '';
  constructor() { }

  getWarshipType(): Observable<WarshipType> {
    const warshipType = warshipTypeArray.find(warshipType => { return this.warshipName = warshipType.name });

    return of(warshipType!);    
  }

  updateWarshipName(name: string) {
    this.warshipName = name;
    return Promise.resolve("resolved");
  }
}
