import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// interface
import { WarshipType } from '../interfaces/warship-type';

@Injectable({
  providedIn: 'root'
})
export class WarshipTypeService {

  warshipSelected!: WarshipType;
  constructor() { }

  getSelectedWarshipType(): Observable<WarshipType> {
    return of(this.warshipSelected);    
  }

  async setSelectedWarship(warship: WarshipType): Promise<string> {
    this.warshipSelected = warship;
    
    return Promise.resolve("resolved");   
  }
}
