import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';
// interfaces
import { WeaponType } from '../Interfaces/weapon-type';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  resolutionMessage: string = "resolved";
  currentWeapon!: WeaponType;
  currentWeaponSubject = new Subject<WeaponType>();
  currentWeaponAmmo: number | null = null;
  currentWeaponAmmoSubject: Subject<number> = new Subject<number>();
  
  constructor() { }

  async setCurrentWeapon(weapon: WeaponType): Promise<string> {
    this.currentWeapon = weapon;
    this.currentWeaponSubject.next(weapon);
    this.currentWeaponAmmo = weapon.ammoCapacity;
    this.currentWeaponAmmoSubject.next(weapon.ammoCapacity)
    await this.refillCurrentWeaponAmmo();

    return Promise.resolve("resolved");
  }

  async refillCurrentWeaponAmmo(): Promise<string> {
    this.currentWeaponAmmo = this.currentWeapon!.ammoCapacity;
    this.currentWeaponAmmoSubject.next(this.currentWeapon.ammoCapacity);

    return Promise.resolve(this.resolutionMessage);
  }

  async decrementCurrentWeaponAmmo(): Promise<string> {
    this.currentWeaponAmmo!--
    return Promise.resolve(this.resolutionMessage);
  }
}
