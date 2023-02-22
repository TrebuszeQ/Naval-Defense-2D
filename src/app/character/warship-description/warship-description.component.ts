import { Component, OnInit } from '@angular/core';
// interfaces
import { WarshipType } from '../interfaces/warship-type';
// services
import { WarshipTypeArrayService } from '../services/warship-type-array.service';

@Component({
  selector: 'app-warship-description',
  templateUrl: './warship-description.component.html',
  styleUrls: ['./warship-description.component.css']
})
export class WarshipDescriptionComponent implements OnInit {
  
  resolutionMessage: string = "resolved";

  warshipArray!: WarshipType[];

  constructor(private warshipArrayService: WarshipTypeArrayService) {}

  async ngOnInit(): Promise<string> {
    await this.getWarshipArray();


    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipArray(): Promise<string> {
    const getWarshipArrayObserver = {
      next: (array: WarshipType[]) => {
        this.warshipArray = array;
      },
      error: (error: Error) => {
        console.error(`getWarshipArrayObserver on warship-description.component faced an error ${error}.`);
      },
      // complete: () => {
      //   console.log("getWarshipArrayObserver on warship-description.component received complete.");
      // }
    }
    
    this.warshipArrayService.getWarshipTypeArray().subscribe(getWarshipArrayObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }
}
