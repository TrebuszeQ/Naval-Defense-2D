import { Injectable } from '@angular/core';
// rxjs
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PregameConsoleService {

  consoleMessage: string = '';
  constructor() { }

  getConsoleMessage(): Observable<string> {

    return of(this.consoleMessage);
  }

  updateConsoleMessage(message: string): Promise<string> {

    this.consoleMessage = message;
    return Promise.resolve("resolved");
  }
}
