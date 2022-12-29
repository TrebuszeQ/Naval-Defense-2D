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

  torpedoName: string = '';

  constructor() { }

  getTorpedoType(): Observable<TorpedoType | undefined> {
    const array: TorpedoType[] = torpedoTypeArray;
    const torpedoType = array.find(element => element.name = this.torpedoName);
    return of(torpedoType);
  }

  updateTorpedoName(name: string) {
    this.torpedoName = name;

    return Promise.resolve("resolved");
  }
}
