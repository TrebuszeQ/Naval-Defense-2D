import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// arrays
import { torpedoTypeArray } from '../arrays/torpedo-types';
// torpedoType
import { TorpedoType } from '../interfaces/torpedo-type';

@Injectable({
  providedIn: 'root'
})
export class TorpedoTypeService {

  constructor() { }

  getTorpedoType(name: string): Observable<TorpedoType | undefined> {
    const array: TorpedoType[] = torpedoTypeArray;
    const torpedoType = array.find(element => element.name = name);
    return of(torpedoType);
  }
}
