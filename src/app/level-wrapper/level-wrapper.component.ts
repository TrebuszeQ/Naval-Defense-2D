import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level-wrapper',
  templateUrl: './level-wrapper.component.html',
  styleUrls: ['./level-wrapper.component.css']
})
export class LevelWrapperComponent implements OnInit {

  warship = document.getElementById('warship');
  warshipX: number = 0;
  controller = new AbortController();
  signal = this.controller.signal;
  // warshipY: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.warship = document.getElementById('warship');
    this.warshipX = 0;
    // warship check
    // console.log(this.warship);

    // listening for keyboardEvent API
    document.addEventListener("keydown", (event) => {
      this.moveCharacter(event);
    });
    console.log(window.screen.width);
  }

  moveCharacter(event: KeyboardEvent) {
    const key = event.key;

    switch(key) {
      case "ArrowRight":
        this.moveCharacterRight();
        // this.moveCharacterRight(warship);
        break;

      case "ArrowLeft":
        this.moveCharacterLeft();
        // this.moveCharacterLeft(warship)
        break;
    }
  }

  moveCharacterRight() {
    console.log('pressed R');
    this.warship!.style.setProperty("transform", `translateX(${this.limitWidthRight(+10)}px`);
    console.log(this.warshipX);
    console.log("finished");
    return;
  }

  moveCharacterLeft() {
    console.log('pressed L');
    this.warship!.style.setProperty("transform", `translateX(${this.limitWidthLeft(-10)}px`);
    console.log(this.warshipX);
    console.log("finished");
    // this.moveCharacterAsync();
    return;
  }

  // limit warship from floating out of the screen
  limitWidthRight(value: number): number {
    const max = window.screen.width;
    let warshipX = this.warshipX;
    if(warshipX == max) {
      return max;
    }
    else {
      // console.log(warshipX + value);
      this.warshipX += value;
      return warshipX;
    }
  }

  // limit warship from floating out of the screen
  limitWidthLeft(value: number): number {
    let warshipX = this.warshipX;
    if(warshipX == 0) {
      return 0;
    }
    else {
      // console.log(warshipX + value);
      this.warshipX += value;
      return warshipX;
    }
  }
}
