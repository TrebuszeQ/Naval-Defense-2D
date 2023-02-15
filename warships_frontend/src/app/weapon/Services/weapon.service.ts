import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';
// services
import { WarshipTypeService } from 'src/app/character/services/warship-type.service';
// interfaces
import { WeaponType } from '../Interfaces/weapon-type';
import { WarshipType } from 'src/app/character/interfaces/warship-type';
import { WeaponArrayItem } from '../Interfaces/weapon-array-item';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  resolutionMessage: string = "resolved";
  warshipType: WarshipType | null = null;
  currentWeapon!: WeaponType;
  currentWeaponSubject = new Subject<WeaponType>();
  currentWeaponAmmo: number | null = null;
  currentWeaponAmmoSubject: Subject<number> = new Subject<number>();
  weaponArray: WeaponArrayItem[] = [];
  weaponArraySubject: Subject<WeaponArrayItem>[] = [];
  
  constructor(private warshipTypeService: WarshipTypeService) { 
    this.getWarshipType();
    this.initializeWeaponArray();
    this.watchAmmoAmountAndRefillIf0();
  }

  async getWarshipType() {
    
    const warshipTypeObserver = {
      next: (warshipType: WarshipType) => { 
        this.warshipType = warshipType;
      },
      error: (error: Error) => "warshipTypeObserver encountered an error" + error,
      // complete: () => console.log("warshipTypeObserver received complete"),
    }
    
    this.warshipTypeService.getSelectedWarshipType().subscribe(warshipTypeObserver).unsubscribe();

    return Promise.resolve(this.resolutionMessage);
  }

  async findWeaponIndexInWeaponArray(weapon: WeaponType): Promise<number> {
    const index: number = this.weaponArray!.findIndex((weaponArrayItem: WeaponArrayItem) => {
      return weaponArrayItem.weapon == weapon;
    });

    return Promise.resolve(index);
  }

  async initializeWeaponArray(): Promise<string> {
    const warshipWeapons = this.warshipType!.availableWeapons!.weapon;
    const weaponQuantity = this.warshipType!.availableWeapons!.quantity
    for(let i = 0; i < warshipWeapons.length; i++) {
      const weaponArrayItem: WeaponArrayItem = {weapon: warshipWeapons[i], quantity: weaponQuantity[i], ammo: warshipWeapons[i].ammoCapacity * weaponQuantity[i]};
      this.weaponArray.push(weaponArrayItem);
      this.weaponArraySubject.push(new Subject());
      this.weaponArraySubject[i].next(weaponArrayItem);
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async setCurrentWeapon(weapon: WeaponType): Promise<string> {
    this.currentWeapon = weapon;
    this.currentWeaponSubject.next(weapon);

    return Promise.resolve(this.resolutionMessage);
  }

  async refillCurrentWeaponAmmo(): Promise<string> {
    this.currentWeaponAmmo = this.currentWeapon!.ammoCapacity;
    this.currentWeaponAmmoSubject.next(this.currentWeapon.ammoCapacity);

    return Promise.resolve(this.resolutionMessage);
  }

  async refillWeaponAmmo(weapon: WeaponType): Promise<string> {
    const index = await this.findWeaponIndexInWeaponArray(weapon);
    const quantity = this.warshipType!.availableWeapons!.quantity[index];

    this.weaponArray[index].ammo = weapon.ammoCapacity * quantity;

    return Promise.resolve(this.resolutionMessage);
  }

  async decrementWeaponAmmo(weapon: WeaponType, amount: number): Promise<string> {
    const index = await this.findWeaponIndexInWeaponArray(weapon);
    this.weaponArray[index].ammo -= amount;
    
    this.weaponArraySubject[index].next(this.weaponArray[index]);

    return Promise.resolve(this.resolutionMessage);
  }

  async watchAmmoAmountAndRefillIf0(): Promise<string> {
    for(let i = 0; i < this.weaponArraySubject.length; i++) {
      this.weaponArraySubject[i].subscribe({
        next: async (weaponArrayItem: WeaponArrayItem) => {
          if(weaponArrayItem.ammo <= 0) {
            const timeout = setTimeout(() => {
              this.refillWeaponAmmo(weaponArrayItem.weapon);
              clearTimeout(timeout);
            }, weaponArrayItem.weapon.reloadingRate * 1000);  
          };
        }
      });
    };
  
    return Promise.resolve(this.resolutionMessage);
  }

}
