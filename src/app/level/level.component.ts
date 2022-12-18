import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LevelComponent implements OnInit {

  maxWidth = window.screen.width;

  maxHeight = window.screen.height;

  constructor() { }

  async ngOnInit(): Promise<string> {

    return Promise.resolve("resolved");
  }
}
