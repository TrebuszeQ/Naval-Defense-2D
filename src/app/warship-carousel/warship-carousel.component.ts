import { Component, OnInit } from '@angular/core';
// types
import { WarshipType } from '../character/interfaces/warship-type';
// services
import { WarshipTypeService } from '../character/services/warship-type.service';
import { WarshipTypeArrayService } from '../character/services/warship-type-array.service';
import { WarshipCarouselService } from './Services/warship-carousel.service';
// icons
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// arrays
import { warshipTypeArray } from '../character/arrays/warship-types-array';


@Component({
  selector: 'app-warship-carousel',
  templateUrl: './warship-carousel.component.html',
  styleUrls: ['./warship-carousel.component.css']
})
export class WarshipCarouselComponent implements OnInit {

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  warshipTypeArray!: WarshipType[];
  warshipCarouselPosition = 0;
  warshipCarouselMax = 0;
  moveAmount = 0;
  carouselAimedWarship: WarshipType = warshipTypeArray[0];
  constructor(private warshipTypeService: WarshipTypeService, private warshipTypeArrayService: WarshipTypeArrayService, private warshipCarouselService: WarshipCarouselService) {}

  async ngOnInit(): Promise<string> {
    await this.getWarshipTypeArray();
    await this.changeArrowsSize();
    await this.setWarshipCarouselMax();
    await this.setMoveAmount();

    return Promise.resolve("resolved");
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
    return Promise.resolve("resolved");
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

    return Promise.resolve("resolved");
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
    return Promise.resolve("resolved");
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

    return Promise.resolve("resolved");
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

    return Promise.resolve("resolved");
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

    return Promise.resolve("resolved");
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

    return Promise.resolve("resolved");
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

    return Promise.resolve("resolved");
  }
  
  async selectWarship(): Promise<string> {
    this.warshipTypeService.setSelectedWarship(this.carouselAimedWarship)

    return Promise.resolve("resolved");
  }

  async setMoveAmount(): Promise<string> {
    if(this.warshipTypeArray.length == (0 || -0 || 1)) {
      this.moveAmount = 0;
    }
    else {
      this.moveAmount = 100;
    }

    return Promise.resolve("resolved");
  }
}
