import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// interfaces
import { WarshipType } from 'src/app/character/interfaces/warship-type';
import { WarshipTypeService } from 'src/app/character/services/warship-type.service';
import { Levels } from '../interfaces/levels';
// services
import { LevelService } from '../Services/level.service';

@Component({
  selector: 'app-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FirstLevelComponent implements OnInit {

  resolutionMessage: string = "resolved";
  level: Levels | null = null;
  warshipType: WarshipType | null= null;

  constructor(private warshipTypeService: WarshipTypeService, private levelService: LevelService) { }

  async ngOnInit(): Promise<string> {
    await this.getLevel();
    await this.getWarshipType();
    await this.setInfrastructurePosition();

    return Promise.resolve("resolved");
  }

  async getLevel(): Promise<string> {
    const getLevelObserver = {
      next: (level: Levels) => {
        this.level = level;
      },
      error: (error: Error) => {
        console.error(`getLevelObserver on first-level.component faced an issue ${error}.`);
      },
      // complete: () => {
      //   console.log("getLevelObserver on first-level.component completed.");
      // }
    }
    
    this.levelService.getSelectedLevel().subscribe(getLevelObserver).unsubscribe();

    return Promise.resolve(this.resolutionMessage);
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

  async setInfrastructurePosition(): Promise<string> {
    const infrastructureElement = document.getElementById("datacenter");
    
    infrastructureElement!.style.left = `${this.level!.startingPosition}%`;

    return Promise.resolve(this.resolutionMessage);
  }
}
