import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// services
import { PregameConsoleService } from './services/pregame-console.service';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrls: ['./pregame.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PregameComponent implements OnInit {
  
  resolutionInfo: string = "resolved";
  pregameConsoleMessage: string = "";
  warshipSelected: boolean = false;
  levelSelected: boolean = false;
  startGamePossible: boolean = false;

  constructor(private pregameConsoleService: PregameConsoleService) {}


  async ngOnInit(): Promise<string> {
    await this.getConsoleMessage();
    await this.addWarshipCarouselSelectButtonSelectionListener();
    await this.addLevelCarouselSelectButtonSelectionListener();

    return Promise.resolve("resolved");
  }

  async getConsoleMessage(): Promise<string> {
    const getConsoleContentObserver = {
      next: (message: string) => {
          this.pregameConsoleMessage = message;
      },
      error: (error: Error) => {
        console.error(`getConsoleContentObserver on pregame.component faced an error ${error}.`);
      },
      // complete: () => {
      //   console.log("getConsoleContentObserver on pregame.component received complete.");
      // }
    }

    this.pregameConsoleService.getConsoleMessage().subscribe(getConsoleContentObserver).unsubscribe();
    
    if(this.pregameConsoleMessage != '') {
      await this.updateConsoleContent();
    }

    return Promise.resolve(this.resolutionInfo);
  }

  async createConsoleMessage(): Promise<HTMLHeadingElement> {

    return Promise.resolve(document.createElement("h4"));
  }

  async updateConsoleContent(): Promise<string> {
    const consoleElement = document.getElementById("pregameConsole");

    const consoleElementMessage = await this.createConsoleMessage();
    
    consoleElementMessage.innerText = this.pregameConsoleMessage;

    consoleElement!.appendChild(consoleElementMessage);

    return Promise.resolve(this.resolutionInfo);
  }


  async addWarshipCarouselSelectButtonSelectionListener(): Promise<string> {
    const warshipCarouselSelectButton = document.getElementById("warshipCarouselSelectButton");

    warshipCarouselSelectButton!.onclick = () => { 
      this.warshipSelected == false ? this.warshipSelected = true : this.warshipSelected;
      this.getConsoleMessage()
    };
  
    return Promise.resolve(this.resolutionInfo);
  }

  async addLevelCarouselSelectButtonSelectionListener(): Promise<string> {
    const levelCarouselSelectButton = document.getElementById("levelCarouselSelectButton");
    
    levelCarouselSelectButton!.onclick = () => { 
      this.levelSelected == false ? this.levelSelected = true : this.levelSelected;
      this.getConsoleMessage();
    }
    return Promise.resolve(this.resolutionInfo);
  }

  allowGameStart(): boolean {
    if((this.warshipSelected && this.levelSelected) == false) {
      return true;
    }    
    else {
      return false;
    }
  }

  async startGame() {
  }
}

