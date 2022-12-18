import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-character',
  // templateUrl: './character.component.html',
  template: '<div id="warship">  </div>',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input() waterLevel = 0;
  @Input() gridRow = 0;

  level = document.getElementById("level");

  stylesheet = document.styleSheets[0];

  warship = document.getElementById("warship");
  
  warshipX: number = 0;
  // warshipY: number = 0;

  keyframeRight = new KeyframeEffect(
    this.warship!,
    [
      { 
        transform: `translateX(${this.warshipX})`, 
        easing: "linear",
      },
    ],
    {
      duration: 200, 
      fill: 'forwards',
    }
  )
  constructor() { }

  async ngOnInit(): Promise<string> {
    // stylesheet
    this.stylesheet = document.styleSheets[0];

    this.level = document.getElementById("level");

    // warship
      await this.spawnWarship().then(() => {
      this.warship = document.getElementById("warship");

      // load default warship (wip)
      this.default(this.warship);
    });

    // warship position
    this.warshipX = 0;
  
    // listening for keyboardEvent API
    document.addEventListener("keydown", (event) => {
      this.moveCharacter(event.key);
    });
    return Promise.resolve("resolved");
  }
  
  default(ship: HTMLElement | null): void {
    const maxHeight = window.screen.height;
    
    ship!.style.width = `12.5%`;
    ship!.style.height = `${maxHeight * 0.025}px`;
  }

  spawnWarship() {
    const warship = document.createElement("div")
    warship.id = "warship";
    this.stylesheet.insertRule(`
    #warship {
      z-index: 8;
      display: block;
      position: absolute;
      margin: 0;
      padding: 0;
      background-color: rgb(101, 101, 101);
    }
    `);

    this.appendWarship(warship);
    return Promise.resolve("resolved");
  }

  appendWarship(warship: HTMLDivElement) {
    this.level!.appendChild(warship);
    return Promise.resolve("resolved")
  }
  async moveCharacter(key: string) {
    
    if(key == "ArrowRight") {
      this.warshipX == 700 ? this.warshipX == 700 : this.warshipX += 2.5;
      await this.moveCharacterRightGrid();
    } 
    else if(key == "ArrowLeft") {
      this.warshipX == 0 ? this.warshipX == 0 : this.warshipX -= 2.5;
      await this.moveCharacterLeftGrid();
    }
    return Promise.resolve("resolved");
  }

  async moveCharacterRightGrid() {
    this.warship!.animate(
      [
        { 
          transform: `translateX(${this.warshipX}%)`,
          easing: "linear",
        }
      ], 
      {
        fill: "forwards",
        duration: 200,
      }

    )
    return Promise.resolve("resolved");
  }

  async moveCharacterLeftGrid() {
    this.warship!.animate(
      [
        { 
          transform: `translateX(${this.warshipX}%)`,
          easing: "linear",
        }
      ], 
      {
        fill: "forwards",
        duration: 200,
      }

    )
    return Promise.resolve("resolved");
  }
}
