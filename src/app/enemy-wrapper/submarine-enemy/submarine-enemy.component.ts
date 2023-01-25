import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submarine-enemy',
  templateUrl: './submarine-enemy.component.html',
  styleUrls: ['./submarine-enemy.component.css']
})
export class SubmarineEnemyComponent implements OnInit {
  
  resolutionMessage: string = "resolved";

  constructor() {}

  async ngOnInit(): Promise<string> {
    
    return Promise.resolve(this.resolutionMessage);
  }
}
