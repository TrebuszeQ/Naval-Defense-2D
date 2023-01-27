import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';
// interfaces
import { Level } from '../interfaces/level';

@Injectable({
  providedIn: 'root'
})
export class LevelTimingService {

  time!: Date;
  timeSubject: Subject<Date> = new Subject<Date>();
  levelSubject = new Subject<Level>;

  constructor() {
  }

  async setLevelTime(levelDate: Date): Promise <string> {
    this.time = levelDate;

    this.setLevelTimeWorker();
    return Promise.resolve("resolved");
  }
  
  async setLevelTimeWorker(): Promise <string> {
    const timeNumber: number = Date.parse(this.time.toDateString());

    if (typeof Worker !== 'undefined') {
      
      const timeWorker = new Worker(new URL("src/app/level-wrapper/levels/Workers/level-time.worker.ts", import.meta.url));
      timeWorker.postMessage(timeNumber);
      timeWorker!.onmessage = (event: MessageEvent) => {
        this.timeSubject.next(event.data);
        // console.log(event.data);
      };
    } else {
      console.error("This environment doesn't allow for Web Workers. Game can't run properly.")
    }

    return Promise.resolve("resolved");
  }

}
