import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  constructor() { }
  maxWidth = window.screen.width;
  maxHeight = window.screen.height;
  ngOnInit(): void {
    this.water2();
  }

  waves() {
    const wavesWrapper = document.getElementById("waves");
    
    let blockAmount = this.maxWidth / 100;
    for(let i = 0; i < blockAmount; i++) {
      let waveBlock = document.createElement("div");
      waveBlock.className = "waveBlock";
      wavesWrapper!.appendChild(waveBlock);
    }
  }

  water() {
  
    let blockAmount = Math.trunc((this.maxWidth / 80) * (this.maxHeight / 45));
    let size = this.maxWidth * 0.0125;
    const waterWrapper = document.getElementById("water");
    const style = document.body.style;
    style.gridTemplateColumns = "80";
  



    const waterBlockRule = 
    `
      :host {
        z-index: inherit;
        display: inline-block;
        position:relative;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: ${size}px;
        height: ${size}px;
      }
    `;


    // insert waterBlock class rule
    document.styleSheets[0].insertRule(waterBlockRule);

    for(let i = 0; i < blockAmount; i++) {
      let waterBlock = document.createElement("div");
      waterBlock.className = "waterBlock";
      waterBlock.id = `waterBlock${i}`;
      waterWrapper!.appendChild(waterBlock);
    }
    return;
  }

  water2() {
    let blockAmount = Math.trunc((this.maxWidth / 80) * (this.maxHeight / 45));
    let size = this.maxWidth * 0.0125;
    
    const level = document.getElementById("level");
    let counter = 0;
    let gridRow = 40;

    let waterBlockRule = 
    `
      .waterBlock {
        z-index: inherit;
        display: inline-block;
        position:relative;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: ${size}px;
        height: ${size}px;
        background-color: blue;

      }`;


    // insert waterBlock class rule
    document.styleSheets[0].insertRule(waterBlockRule);

    
    // console.log(level);

    for(let i = 0; i < blockAmount; i++, counter++) {
      let waterBlock = document.createElement("div");
      waterBlock.className = "waterBlock";
      waterBlock.id = `waterBlock${i}`;
      if(counter == 10) {
        counter = 0;
        gridRow -= 10;
      }
      waterBlock.style.gridRow = `${gridRow}`;
      level!.appendChild(waterBlock);
    }
    return;
  }
}
