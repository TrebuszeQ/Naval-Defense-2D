import { Component, OnInit } from '@angular/core';
// services
import { WaterService } from './Services/water.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit {

  stylesheet = document.styleSheets[0];

  gridRows = 0;
  gridColumns = 0;

  blockAmount = 0;
  constructor(private waterService: WaterService) { }

  ngOnInit(): void {
    // water service
    // set water levels
    this.waterService.getWaterLevels().subscribe(array => {
      this.gridRows = array[0];
      this.gridColumns = array[1];
      this.blockAmount = this.gridRows * this.gridColumns;
    });
    
    this.stylesheet = document.styleSheets[0];

    this.fillWater();
  }
  
  fillWater() { 
    const water = document.getElementById("water");
    let columnCounter = 0;
    let gridRow = 42;

    let waterBlockRule = 
    `
       .waterBlock {
        z-index: 6;
        display: inline-block;
        position:relative;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: #58989b;
      }`;


    // insert waterBlock class rule
    this.stylesheet.insertRule(waterBlockRule);

    for(let i = 0; i < this.blockAmount; i++, columnCounter++) {
      let waterBlock = document.createElement("div");
      waterBlock.className = "waterBlock";
      waterBlock.id = `waterBlock${i}`;

      if(columnCounter == this.gridColumns) {
        columnCounter = 0;
        gridRow -= 1;
      }
      waterBlock.style.gridRow = `${gridRow}`;
      water!.appendChild(waterBlock);
    }
    return;
  }
}
