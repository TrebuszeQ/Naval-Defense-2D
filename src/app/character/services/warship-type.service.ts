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

  constructor() { }

  getWarshipType(name: string): Observable<WarshipType> {
    const warshipType = warshipTypeArray.find(warshipType => { return name = warshipType.name });

    return of(warshipType!);    
  }
}
