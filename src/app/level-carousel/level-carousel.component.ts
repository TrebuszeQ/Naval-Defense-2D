import { Component, OnInit } from '@angular/core';
// types

// services

// icons
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// arrays


@Component({
  selector: 'app-level-carousel',
  templateUrl: './level-carousel.component.html',
  styleUrls: ['./level-carousel.component.css']
})
export class LevelCarouselComponent implements OnInit {

  async ngOnInit(): Promise<string> {
    
    return Promise.resolve("resolved");
  }

}
