import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  // templateUrl: './character.component.html',
  template: '',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  maxWidth = window.screen.width;
  maxHeight = window.screen.height;
  constructor() { }

  ngOnInit(): void {
    const ship = document.getElementById("warship");
    this.default(ship);
  }

  default(ship: HTMLElement | null): void {
    ship!.style.width = `12.5%`;
    ship!.style.height = `${this.maxHeight * 0.025}px`;
  }
}
