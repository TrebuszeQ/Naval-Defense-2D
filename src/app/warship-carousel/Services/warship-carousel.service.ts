import { Injectable, OnInit } from '@angular/core';
// rxjs
import { Observable, of } from 'rxjs';
// interfaces
import { WarshipType } from 'src/app/character/interfaces/warship-type';
// services
import { WarshipTypeArrayService } from 'src/app/character/services/warship-type-array.service';

@Injectable({
  providedIn: 'root'
})
export class WarshipCarouselService {

  warshipTypeArray!: WarshipType[];
  warshipCarouselMax: number = 0;

  constructor(private warshipTypeArrayService: WarshipTypeArrayService) { 
    this.ngOnInit();
  }

  async ngOnInit(): Promise<string>  {
    await this.getWarshipTypeArray();
    await this.setWarshipCarouselMax();

    return Promise.resolve("resolved");
  }

  async getWarshipTypeArray(): Promise<string> {
    const getWarshipTypeArrayObserver = {
      next: (array: WarshipType[]) => {
        this.warshipTypeArray = array;
      },

      error: (error: Error) => {
        console.error(`getWarshipTypeArrayObserver on WarshipCarouselService faced an error: ${error}.`);
      },

      // complete: () => {
      //   console.log("getWarshipTypeArrayObserver received complete.");
      // }
    }

    this.warshipTypeArrayService.getWarshipTypeArray().subscribe(getWarshipTypeArrayObserver).unsubscribe();

    return Promise.resolve("resolved");
  }

  async setWarshipCarouselMax(): Promise <string> {    
    for(let i = 0; i < this.warshipTypeArray.length - 1; i++) {
      this.warshipCarouselMax += 100;
    }
    return Promise.resolve("resolved");
  }

  getWarshipCarouselMax(): Observable<number> {

    return of(this.warshipCarouselMax);
  }
}

// import { Injectable, OnInit } from '@angular/core';
// // rxjs
// import { Observable, of } from 'rxjs';
// // interfaces
// import { WarshipType } from 'src/app/character/interfaces/warship-type';
// // services
// import { WarshipTypeArrayService } from 'src/app/character/services/warship-type-array.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class WarshipCarouselService {

//   warshipTypeArray!: WarshipType[];
//   warshipCarouselMax: number = 0;

//   constructor(private warshipTypeArrayService: WarshipTypeArrayService) { 
//     this.ngOnInit();
//   }

//   async ngOnInit(): Promise<string>  {
//     await this.getWarshipTypeArray();
//     await this.setWarshipCarouselMax();

//     return Promise.resolve("resolved");
//   }

//   async getWarshipTypeArray(): Promise<string> {
//     const getWarshipTypeArrayObserver = {
//       next: (array: WarshipType[]) => {
//         this.warshipTypeArray = array;
//       },

//       error: (error: Error) => {
//         console.error(`getWarshipTypeArrayObserver on WarshipCarouselService faced an error: ${error}.`);
//       },

//       // complete: () => {
//       //   console.log("getWarshipTypeArrayObserver received complete.");
//       // }
//     }

//     this.warshipTypeArrayService.getWarshipTypeArray().subscribe(getWarshipTypeArrayObserver).unsubscribe();

//     return Promise.resolve("resolved");
//   }

//   async setWarshipCarouselMax(): Promise <string> {    
//     for(let i = 0; i < this.warshipTypeArray.length - 1; i++) {
//       this.warshipCarouselMax += 100;
//     }
//     return Promise.resolve("resolved");
//   }

//   getWarshipCarouselMax(): Observable<number> {

//     return of(this.warshipCarouselMax);
//   }
// }
