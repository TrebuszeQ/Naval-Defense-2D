import { Component, OnInit } from '@angular/core';
// interfaces
import { Levels } from '../level-wrapper/levels/interfaces/levels';
// services
import { LevelService } from '../level-wrapper/levels/Services/level.service';
import { LevelArrayService } from '../level-wrapper/levels/Services/level-array.service';
import { LevelCarouselService } from './Services/level-carousel.service';
// icons
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-level-carousel',
  templateUrl: './level-carousel.component.html',
  styleUrls: ['./level-carousel.component.css']
})
export class LevelCarouselComponent implements OnInit {

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  levelArray!: Levels[];

  levelCarouselMax: number = 0;
  levelCarouselPosition: number = 0;
  moveAmount = 0;
  carouselAimedLevel!: Levels;

  constructor(private levelService: LevelService, private levelArrayService: LevelArrayService, private levelCarouselService: LevelCarouselService) {}
  
  async ngOnInit(): Promise<string> {
    await this.getLevelsArray();
    await this.changeArrowsSize();
    await this.getLevelCarouselMax();
    await this.setMoveAmount();


    return Promise.resolve("resolved");
  }

  async getLevelsArray(): Promise<string> {
    const getLevelArrayObserver = {
      next: (array: Levels[]) => {
        this.levelArray = array;
      },
      error: (error: Error) => {
        console.error(`getLevelArrayObserver on level-carousel faced an error: ${error}`);
      },
      // complete: () => {
      //   console.log("getLevelArrayObserver on level-carousel received complete.");
      // }
    }

    this.levelArrayService.getLevelArray().subscribe(getLevelArrayObserver).unsubscribe();
    return Promise.resolve("resolved");
  }

    async changeArrowsSize(): Promise<string> {
      const arrowLeft3 = document.getElementsByClassName('fa-arrow-right').item(1);
      const arrowRight3 = document.getElementsByClassName('fa-arrow-left').item(1);

      arrowLeft3!.id = 'fa-arrow-right2';
      arrowRight3!.id = 'fa-arrow-left2';

      const arrowLeft4 = document.getElementById("fa-arrow-left2");
      const arrowRight4 = document.getElementById("fa-arrow-right2");

      const percentage = "7.5%";

      arrowLeft4!.style.height = percentage;
      arrowRight4!.style.height = percentage;

    return Promise.resolve("resolved");
  }

  async getLevelCarouselMax(): Promise<string> {
  const setLevelCarouselMaxObserver = {
    next: (max: number) => {
      this.levelCarouselMax = 0 ? this.levelCarouselMax = 0 : this.levelCarouselMax = -max;
    },
      error: (error: Error) => {
        console.error(`setLevelCarouselMaxObserver on level-carousel.component faced an error: ${error}.`)
      },
      // complete: () => {
      //   console.log("setLevelCarouselMaxObserver on level-carousel.component received complete.");
      // }
    };

    this.levelCarouselService.getLevelCarouselMax().subscribe(setLevelCarouselMaxObserver).unsubscribe();
    return Promise.resolve("resolved");
   }

  async setLevelCarouselPositionLeft(): Promise<string> {

        if (this.levelCarouselMax == (0 || -0)) {
          this.levelCarouselPosition = this.levelCarouselMax;
        }
        else if(this.levelCarouselPosition != this.levelCarouselMax && this.levelCarouselPosition != 0) {
          this.levelCarouselPosition += this.moveAmount;
        }
        else if(this.levelCarouselPosition == this.levelCarouselMax) {
          this.levelCarouselPosition = 0;
        };
    
        return Promise.resolve("resolved");
      }

    async setLevelCarouselPositionRight(): Promise<string> {

    if (this.levelCarouselPosition == (0 || -0)) {
      this.levelCarouselPosition -= this.moveAmount;
    }
    else if(this.levelCarouselPosition != this.levelCarouselMax && this.levelCarouselPosition != 0) {
      this.levelCarouselPosition -= this.moveAmount;
    }
    else if(this.levelCarouselPosition == this.levelCarouselMax) {
      this.levelCarouselPosition = 0;
    };

    return Promise.resolve("resolved");
  }

  async aimedLevel(): Promise<string> {
    switch(this.levelCarouselPosition) {
      case (0 || -0):
        this.carouselAimedLevel = this.levelArray[0];
      break;
    }

    return Promise.resolve("resolved");
  }
  
  async selectLevel(): Promise<string> {
    this.levelService.setSelectedLevel(this.carouselAimedLevel);

    return Promise.resolve("resolved");
  }

  async moveLevelCarouselRight(): Promise<string> {
    const carouselUl = document.getElementById("levelCarouselUl");

    await this.setLevelCarouselPositionRight();
    await this.aimedLevel();

    // console.log(this.levelCarouselPosition);

    carouselUl!.animate(
    [
      {
        transform: `translateX(${this.levelCarouselPosition}%)`,
        easing: "ease-out",
      }
    ],
    {
      fill: "forwards",
      duration: 200,
    });

    return Promise.resolve("resolved");
  }

    async moveLevelCarouselLeft(): Promise<string> {
    const carouselUl = document.getElementById("levelCarouselUl");

    await this.setLevelCarouselPositionRight();
    await this.aimedLevel();

    // console.log(this.levelCarouselPosition);

    carouselUl!.animate(
      [
        {
          transform: `translateX(${this.levelCarouselPosition}%)`,
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

  async setMoveAmount(): Promise<string> {
    if(this.levelArray.length == (0 || -0 || 1)) {
      this.moveAmount = 0;
    }
    else if(this.levelArray.length) {
      this.moveAmount = 100;
    }

    return Promise.resolve("resolved");
  }
}
