import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FirstLevelComponent implements OnInit {

  maxWidth = window.screen.width;

  maxHeight = window.screen.height;

  constructor() { }

  async ngOnInit(): Promise<string> {

    return Promise.resolve("resolved");
  }
}
