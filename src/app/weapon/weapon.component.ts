import { Component, OnInit } from '@angular/core';
// interfaces
import { WarshipType } from '../character/interfaces/warship-type';
// services 
import { WarshipPositionService } from '../character/services/warship-position.service';
import { WarshipTypeService } from '../character/services/warship-type.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {
  
  resolutionMessage: string = "resolved";
  mousePosition: number[] = [];
  warshipX: number = 0;
  warshipType: WarshipType | null = null
  levelSize: string[] = [];
  shotCounter: number = 0;



  constructor(private warshipTypeService: WarshipTypeService, private warshipPositionService: WarshipPositionService) {}

  async ngOnInit(): Promise <string> {
    await this.setLevelSize();
    await this.getWarshipType();
    await this.getWarshipPositionSubject();
    await this.addMouseMoveListener();
    await this.addMouseShotListener();

    return Promise.resolve(this.resolutionMessage);
  }

  async addMouseMoveListener(): Promise <string> {
    const levelElement = document.getElementById("level");
    const mouseListener = levelElement!.addEventListener("mousemove", (event: MouseEvent) => {
      this.mousePosition = [event.clientX, event.clientY];
    })

    return Promise.resolve(this.resolutionMessage);
  }
  
  async addMouseShotListener(): Promise <string> {
    const levelElement = document.getElementById("level");
    
    levelElement!.addEventListener("click", (event: MouseEvent) => {
      if((this.mousePosition[0] > ( this.warshipX + this.warshipType!.length) ) && (this.warshipX - this.warshipType!.length)) {
        this.createShootingEffect();
        this.endShootingEffect();   
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }
  async getWarshipType(): Promise<string> {
    const getWarshipObserver = {
      next: (warship: WarshipType) => {
        this.warshipType = warship;
      },
      error: (error: Error) => {
        console.error(`getWarshipObserver on level-wrapper.component faced an issue: ${error}.`);
      },
      // complete: () => {
      //   console.log("getWarshipObserver on level-wrapper.component completed.");
      // }
    }

    this.warshipTypeService.getSelectedWarshipType().subscribe(getWarshipObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipPositionSubject(): Promise <string> {
    this.warshipPositionService.warshipXSubject.subscribe({
      next: (warshipX: number) => {
        this.warshipX = warshipX;
      }
    });

    return Promise.resolve(this.resolutionMessage);
  }

  async createShootingEffect(): Promise<string> {
    const shotElement = document.getElementById("weaponShot");

    shotElement!.style.display = "flex";
    shotElement!.style.inset = `${this.mousePosition[0]} ${this.mousePosition[1]} 0 0`;

    return Promise.resolve(this.resolutionMessage);
  }

  async endShootingEffect(): Promise<string> {
    const shotElement = document.getElementById("weaponShot");

    return Promise.resolve(this.resolutionMessage);
  }

  async setLevelSize(): Promise<string> {
    const levelElement = document.getElementById("level");
    this.levelSize[0] = getComputedStyle(levelElement!).width;
    this.levelSize[1] = getComputedStyle(levelElement!).height;

    return Promise.resolve(this.resolutionMessage);
  }

}
