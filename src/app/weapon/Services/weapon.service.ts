import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';
// interfaces
import { WeaponType } from '../Interfaces/weapon-type';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  currentWeapon!: WeaponType;
  currentWeaponSubject = new Subject<WeaponType>();
  
  constructor() { }

  async setCurrentWeapon(weapon: WeaponType) {
    this.currentWeapon = weapon;
    this.currentWeaponSubject.next(weapon);
    
    return Promise.resolve("resolved");
  }

}
