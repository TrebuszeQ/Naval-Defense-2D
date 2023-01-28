import { Component, OnInit } from '@angular/core';
// interfaces
import { WarshipType } from '../character/interfaces/warship-type';
import { WeaponType } from '../weapon/Interfaces/weapon-type';
import { Skills } from '../character/interfaces/skills';
import { TorpedoType } from '../torpedo/Interfaces/torpedo-type';
// services
import { WarshipTypeService } from '../character/services/warship-type.service';
import { WarshipTypeArrayService } from '../character/services/warship-type-array.service';
import { WarshipCarouselService } from './Services/warship-carousel.service';
import { PregameConsoleService } from '../pregame/services/pregame-console.service';
// icons
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// arrays
import { warshipTypeArray } from '../character/arrays/warship-types-array';
// types
import { vector } from '../weapon/Types/vector';




@Component({
  selector: 'app-warship-carousel',
  templateUrl: './warship-carousel.component.html',
  styleUrls: ['./warship-carousel.component.css']
})
export class WarshipCarouselComponent implements OnInit {

  resolutionMessage: string = "resolved";
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  warshipTypeArray!: WarshipType[];
  warshipCarouselPosition = 0;
  warshipCarouselMax = 0;
  moveAmount = 0;
  carouselAimedWarship: WarshipType = warshipTypeArray[0];
  constructor(private warshipTypeService: WarshipTypeService, private warshipTypeArrayService: WarshipTypeArrayService, private warshipCarouselService: WarshipCarouselService, private pregameConsoleService: PregameConsoleService) {}

  async ngOnInit(): Promise<string> {
    await this.getWarshipTypeArray();
    await this.changeArrowsSize();
    await this.setWarshipCarouselMax();
    await this.setMoveAmount();

    return Promise.resolve(this.resolutionMessage);
  }

  async getWarshipTypeArray(): Promise<string> {
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

    this.warshipTypeArrayService.getWarshipTypeArray().subscribe(getWarshipTypeArrayObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async changeArrowsSize(): Promise<string> {
    const arrowLeft = document.getElementsByClassName('fa-arrow-right').item(0);
    const arrowRight = document.getElementsByClassName('fa-arrow-left').item(0);

    arrowLeft!.id = 'fa-arrow-right';
    arrowRight!.id = 'fa-arrow-left';

    const arrowLeft2 = document.getElementById("fa-arrow-left");
    const arrowRight2 = document.getElementById("fa-arrow-right");

    const percentage = "7.5%";

    arrowLeft2!.style.height = percentage;
    arrowRight2!.style.height = percentage;

    return Promise.resolve(this.resolutionMessage);
  }

  async setWarshipCarouselMax(): Promise<string> {
    const setWarshipCarouselMaxObserver = {
      next: (max: number) => {
        this.warshipCarouselMax = 0 ? this.warshipCarouselMax = 0 : this.warshipCarouselMax = -max;
      },
      error: (error: Error) => {
        console.error(`setWarshipCarouselMaxObserver on warship-carousel.component faced an error: ${error}.`)
      },
      // complete: () => {
      //   console.log("setWarshipCarouselMaxObserver on warship-carousel.component received complete.");
      // }
    };

    this.warshipCarouselService.getWarshipCarouselMax().subscribe(setWarshipCarouselMaxObserver).unsubscribe();
    return Promise.resolve(this.resolutionMessage);
  }

  async setWarshipCarouselPositionLeft(): Promise<string> {

    if (this.warshipCarouselPosition == (0 || -0)) {
      this.warshipCarouselPosition = this.warshipCarouselMax;
    }
    else if(this.warshipCarouselPosition != this.warshipCarouselMax && this.warshipCarouselPosition != 0) {
      this.warshipCarouselPosition += this.moveAmount;
    }
    else if(this.warshipCarouselPosition == this.warshipCarouselMax) {
      this.warshipCarouselPosition = 0;
    };

    return Promise.resolve(this.resolutionMessage);
  }

  async setWarshipCarouselPositionRight(): Promise<string> {

    if (this.warshipCarouselPosition == (0 || -0)) {
      this.warshipCarouselPosition -= this.moveAmount;
    }
    else if(this.warshipCarouselPosition != this.warshipCarouselMax && this.warshipCarouselPosition != 0) {
      this.warshipCarouselPosition -= this.moveAmount;
    }
    else if(this.warshipCarouselPosition == this.warshipCarouselMax) {
      this.warshipCarouselPosition = 0;
    };

    return Promise.resolve(this.resolutionMessage);
  }

  async moveWarshipCarouselRight(): Promise<string> {
    const carouselUl = document.getElementById("warshipCarouselUl");

    await this.setWarshipCarouselPositionRight();
    await this.aimedWarship();

    // console.log(this.warshipCarouselPosition);

    carouselUl!.animate(
    [
      {
        transform: `translateX(${this.warshipCarouselPosition}%)`,
        easing: "ease-out",
      }
    ],
    {
      fill: "forwards",
      duration: 200,
    });

    return Promise.resolve(this.resolutionMessage);
  }

  async moveWarshipCarouselLeft(): Promise<string> {
    const carouselUl = document.getElementById("warshipCarouselUl");

    await this.setWarshipCarouselPositionLeft();
    await this.aimedWarship();

    // console.log(this.warshipCarouselPosition);

    carouselUl!.animate(
      [
        {
          transform: `translateX(${this.warshipCarouselPosition}%)`,
          easing: "ease-out",
        }
      ],
      {
        fill: "forwards",
        duration: 200,
      }
    )

    return Promise.resolve(this.resolutionMessage);
  }

  async aimedWarship(): Promise<string> {
    switch(this.warshipCarouselPosition) {
      case (0 || -0):
        this.carouselAimedWarship = warshipTypeArray[0];
      break;
      
      case -100: 
        this.carouselAimedWarship = warshipTypeArray[1];
      break;

      case -200: 
        this.carouselAimedWarship = warshipTypeArray[2];
      break;
    }

    return Promise.resolve(this.resolutionMessage);
  }
  
  async selectWarship(): Promise<string> {
    this.warshipTypeService.setSelectedWarship(this.carouselAimedWarship);
    await this.sendMessageToPregameConsole(this.carouselAimedWarship.name);
    
    return Promise.resolve(this.resolutionMessage);
  }

  async setMoveAmount(): Promise<string> {
    if(this.warshipTypeArray.length == (0 || -0 || 1)) {
      this.moveAmount = 0;
    }
    else {
      this.moveAmount = 100;
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async sendMessageToPregameConsole(message: string): Promise<string> {
    this.pregameConsoleService.updateConsoleMessage(message);

    return Promise.resolve(this.resolutionMessage);
  }

  async displayWeaponExtendedDetails(weapon: WeaponType, elementName: string, quantity: number) {
    const warshipDetailsExtended = document.getElementById(`warshipDetailsExtended${elementName}`);

        // weaponName: string,
    // caliber: string,
    // firingRate: number,
    // reloadingRate: number,
    // muzzleVelo: number,
    // ammoCapacity: number,
    // range: number[],
    // barrelLife: number,
    // attackVector: AttackVector[],
    // damage: number[],
    // armorPenetration: number,
    // train: number | null,

    const content: string = 
    `
    <h4>Caliber:</h4>
    <p>${weapon.caliber}</p>
    <h4>Ammo capacity:</h4>
    <p>${weapon.ammoCapacity}</p>
    <h4>Train degrees:</h4>
    <p>${weapon.train}</p>
    <h4>Firing rate:</h4>
    <p>${weapon.firingRate}</p>
    <h4>Barell life:</h4>
    <p>${weapon.barrelLife}</p>
    <h4>Armor penetration:</h4>
    <p>${weapon.armorPenetration}</p>
    <h4>Quantity:</h4>
    <p>${quantity}</p>
    <h4>Range</h4>
    <ul class="warshipWeaponRangeUl">
      <li>surface: ${await this.displayWeaponRange(weapon.range.ground)},</li>
      <li>air: ${await this.displayWeaponRange(weapon.range.air)},</li>
      <li>underwater: ${await this.displayWeaponRange(weapon.range.submarine)},</li>   
    </ul>
    `

    warshipDetailsExtended!.innerHTML = content;

    return Promise.resolve(this.resolutionMessage);
  }

  async displayWeaponRange(range: number): Promise<string> {
    if(range == 0) {
      return "none";
    } 
    else {
      return `${range} m`
    }
  }

  async displayTorpedoExtendedDetails(torpedo: TorpedoType, elementName: string, quantity: number) {
    const warshipDetailsExtended = document.getElementById(`warshipDetailsExtended${elementName}`);

    // torpedoName: string,
    // length: number,
    // height: number,
    // backgroundImagePath: string | null,
    // damage: number,
    // area: number,
    // speed: number,
    // limit: number,
    // loadingTime: number,
    // range: number,
    // navigated: boolean,

    const content: string = 
    `
    <h4>Length:</h4>
    <p>${torpedo.length}</p>
    <h4>Range</h4>
    <p>${torpedo.range}</p>
    <h4>Speed</h4>
    <p>${torpedo.speed}</p>
    <h4>Area</h4>
    <p>${torpedo.area}</p>
    <h4>Limit</h4>
    <p>${torpedo.limit}</p>
    <h4>Loading Time</h4>
    <p>${torpedo.loadingTime}</p>
    <h4>Quantity:</h4>
    <p>${quantity}</p>
    <h4>Navigated:</h4>
    <p>${torpedo.navigated}</p>
    `
    warshipDetailsExtended!.innerHTML = content;

    return Promise.resolve(this.resolutionMessage);
  }
}
