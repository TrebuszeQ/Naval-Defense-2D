import { Injectable } from '@angular/core';
// arrays
import { warshipTypeArray } from '../arrays/warship-types-array';
// interfaces
import { WarshipType } from '../interfaces/warship-type';
// rxjs
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarshipTypeArrayService {

  constructor() { }

  getWarshipTypeArray(): Observable<WarshipType[]> {
    return of(warshipTypeArray); 
  }
}
