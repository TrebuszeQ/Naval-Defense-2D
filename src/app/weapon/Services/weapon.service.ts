import { Injectable } from '@angular/core';
// interfaces
import { WeaponType } from '../Interfaces/weapon-type';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  currentWeapon!: WeaponType;
  
  constructor() { }

  async setCurrentWeapon(weapon: WeaponType) {
    this.currentWeapon = weapon;
    
    return Promise.resolve("resolved");
  }

}
