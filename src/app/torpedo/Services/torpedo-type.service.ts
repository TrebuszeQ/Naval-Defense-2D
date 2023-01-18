import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// arrays
import { torpedoTypeArray } from '../../torpedo/Arrays/torpedo-types';
// torpedoType
import { TorpedoType } from '../../torpedo/Interfaces/torpedo-type';

@Injectable({
  providedIn: 'root'
})
export class TorpedoTypeService {

  torpedoName: string = '';

  constructor() { }

  getTorpedoType(): Observable<TorpedoType | undefined> {
    const array: TorpedoType[] = torpedoTypeArray;
    const torpedoType = array.find(element => element.torpedoName = this.torpedoName);
    return of(torpedoType);
  }

  updateTorpedoName(name: string) {
    this.torpedoName = name;

    return Promise.resolve("resolved");
  }
}
