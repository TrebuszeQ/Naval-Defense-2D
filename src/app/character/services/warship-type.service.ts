import { Injectable } from '@angular/core';
import { Observable, of, Subject} from 'rxjs';

// interface
import { WarshipType } from '../interfaces/warship-type';

@Injectable({
  providedIn: 'root'
})
export class WarshipTypeService {

  warshipSelected!: WarshipType;
  warshipTypeSubject: Subject<WarshipType> = new Subject<WarshipType>();
  constructor() { }

  getSelectedWarshipType(): Observable<WarshipType> {
    return of(this.warshipSelected);    
  }

  async setSelectedWarship(warship: WarshipType): Promise<string> {
    this.warshipSelected = warship;
    this.warshipTypeSubject.next(warship);
    
    return Promise.resolve("resolved");   
  }
}
