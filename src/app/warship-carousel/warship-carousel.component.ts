import { Component, OnInit } from '@angular/core';
// types
import { WarshipType } from '../character/interfaces/warship-type';
// services
import { WarshipTypeService } from '../character/services/warship-type.service';


@Component({
  selector: 'app-warship-carousel',
  templateUrl: './warship-carousel.component.html',
  styleUrls: ['./warship-carousel.component.css']
})
export class WarshipCarouselComponent implements OnInit {

  warshipTypeArray!: WarshipType[];

  constructor(private warshipTypeService: WarshipTypeService ) {}

  async ngOnInit(): Promise<string> {
    await this.getWarshipTypeArray();
    return Promise.resolve("resolved");
  }

  async getWarshipTypeArray(): Promise<string> {
    // getWarshipType(): Observable<WarshipType> {
    //   const warshipType = warshipTypeArray.find(warshipType => { return this.warshipName = warshipType.name });
  
    //   return of(warshipType!);    
    // }
    const getWarshipTypeArrayObserver = {
      next: (array: WarshipType[]) => {
        this.warshipTypeArray = array;
    },
      error: (error: Error) => {
        console.error(`getWarshipTypeArray on warship-carousel component faced an error: ${error}`);
      }, 
      // complete: () => {
      //   console.log("getWatershipTypeArrayObserver on warship-carousel received complete.");
      // }
    }

    this.warshipTypeService.getWarshipTypeArray().subscribe(getWarshipTypeArrayObserver).unsubscribe();
    return Promise.resolve("resolved");
  }
}
