import { Component, OnInit } from '@angular/core';
// types
import { WarshipType } from '../character/interfaces/warship-type';
// services
import { WarshipTypeService } from '../character/services/warship-type.service';
// icons
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


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
  moveAmount = 50;
  constructor(private warshipTypeService: WarshipTypeService ) {}

  async ngOnInit(): Promise<string> {
    await this.getWarshipTypeArray();
    await this.changeArrowsSize();

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

  async moveWarshipCarouselRight() {
    const carouselUl = document.getElementById("warshipCarouselUl");

    this.warshipCarouselPosition == -50 ? this.warshipCarouselPosition += this.moveAmount : this.warshipCarouselPosition -= this.moveAmount;
    
    // console.log(this.moveAmount);

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
  }

  async moveWarshipCarouselLeft() {
    const carouselUl = document.getElementById("warshipCarouselUl");

    this.warshipCarouselPosition == 0 ? this.warshipCarouselPosition -= this.moveAmount : this.warshipCarouselPosition += this.moveAmount;

    // console.log(this.moveAmount);

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
  }
}
