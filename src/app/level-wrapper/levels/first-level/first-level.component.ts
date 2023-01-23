import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// interfaces
import { WarshipType } from 'src/app/character/interfaces/warship-type';
import { WarshipTypeService } from 'src/app/character/services/warship-type.service';
// services

@Component({
  selector: 'app-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FirstLevelComponent implements OnInit {

  resolutionMessage: string = "resolved";
  warshipType: WarshipType | null= null;

  constructor(private warshipTypeService: WarshipTypeService) { }

  async ngOnInit(): Promise<string> {
    await this.getWarshipType();
    
    return Promise.resolve("resolved");
  }

  async getWarshipType(): Promise<string> {
    const warshipTypeObserver = {
      next: (warship: WarshipType) => {
        this.warshipType = warship;
      },
      error: (error: Error) => {
        console.error(`warshipTypeObserver on first-level.component faced an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("warshipTypeObserver on first-leve.component completed.");
      // }
    }
    this.warshipTypeService.getSelectedWarshipType().subscribe(warshipTypeObserver).unsubscribe();

    return Promise.resolve(this.resolutionMessage);
  }
}
