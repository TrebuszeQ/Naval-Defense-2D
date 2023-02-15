import { Injectable, OnInit } from '@angular/core';
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
  currentTorpedo: TorpedoType | null = null;

  constructor() {this.ngOnInit}

  async ngOnInit(): Promise<string> {
    

    return Promise.resolve("resolved");
  }

  getTorpedoTypeLegacy(): Observable<TorpedoType | undefined> {
    const array: TorpedoType[] = torpedoTypeArray;
    const torpedoType = array.find(element => element.torpedoName = this.torpedoName);
    return of(torpedoType);
  }

  updateTorpedoName(name: string) {
    this.torpedoName = name;

    return Promise.resolve("resolved");
  }

  getTorpedoType(): Observable<TorpedoType | null> {
    
    return of(this.currentTorpedo);
  }

  async setTorpedoType(torpedo: TorpedoType): Promise<string> {
    this.currentTorpedo = torpedo;

    return Promise.resolve("resolved");
  } 
}
