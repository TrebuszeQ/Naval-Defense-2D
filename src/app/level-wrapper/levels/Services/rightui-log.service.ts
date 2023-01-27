import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightUiLogService {

  resolutionMessage: string = "resolved";
  // rightUiLog: string = '';
  rightUiLogSubject = new Subject<string>();

  constructor() { }

  async updateRightUiLog(content: string): Promise<string> {
    // this.rightUiLog += content;
    this.rightUiLogSubject.next(content);
    
    return Promise.resolve(this.resolutionMessage);
  }
}
