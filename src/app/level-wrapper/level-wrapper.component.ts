import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-level-wrapper',
  templateUrl: './level-wrapper.component.html',
  styleUrls: ['./level-wrapper.component.css']
})
export class LevelWrapperComponent implements OnInit {

  warshipElement = document.getElementById('app-character');
  warshipX: number = 0;
  controller = new AbortController();
  signal = this.controller.signal;
  // warshipY: number = 0;
  constructor() { }

  ngOnInit(): void {
  }
}
