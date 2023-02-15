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
  
  resolutionMessage: string = "resolved";
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

    return Promise.resolve(this.resolutionMessage);
  }

  async createConsoleMessage(): Promise<HTMLHeadingElement> {

    return Promise.resolve(document.createElement("h4"));
  }

  async updateConsoleContent(): Promise<string> {
    const consoleElement = document.getElementById("pregameConsole");

    const consoleElementMessage = await this.createConsoleMessage();
    
    consoleElementMessage.innerText = this.pregameConsoleMessage;

    consoleElement!.appendChild(consoleElementMessage);

    return Promise.resolve(this.resolutionMessage);
  }


  async addWarshipCarouselSelectButtonSelectionListener(): Promise<string> {
    const warshipCarouselSelectButton = document.getElementById("warshipCarouselSelectButton");

    warshipCarouselSelectButton!.onclick = () => { 
      this.warshipSelected == false ? this.warshipSelected = true : this.warshipSelected;
      this.getConsoleMessage()
    };
  
    return Promise.resolve(this.resolutionMessage);
  }

  async addLevelCarouselSelectButtonSelectionListener(): Promise<string> {
    const levelCarouselSelectButton = document.getElementById("levelCarouselSelectButton");
    
    levelCarouselSelectButton!.onclick = () => { 
      this.levelSelected == false ? this.levelSelected = true : this.levelSelected;
      this.getConsoleMessage();
    }
    return Promise.resolve(this.resolutionMessage);
  }

  allowGameStart(): boolean {
    if((this.warshipSelected && this.levelSelected) == false) {
      return true;
    }    
    else {
      return false;
    }
  }

  async hideCarousel(carousel: "level" | "warship"): Promise<string> {    
    const chooseWarshipButton = document.getElementById("chooseWarshipButton");
    const chooseLevelButton = document.getElementById("chooseLevelButton");

    const levelCarousel = document.getElementById("levelCarousel");
    const warshipCarousel = document.getElementById("warshipCarousel");

    switch(carousel) {
      case "level":
        chooseWarshipButton!.className = "headerButton headerButtonMain navy";
        chooseLevelButton!.className = "headerButton headerButtonMinimized navy";
        levelCarousel!.className = "carouselHidden";
        warshipCarousel!.className = "carousel2";
        break;
      case "warship":
        chooseLevelButton!.className = "headerButton headerButtonMain navy";
        chooseWarshipButton!.className = "headerButton headerButtonMinimized navy";
        warshipCarousel!.className = "carouselHidden";
        levelCarousel!.className = "carousel2";
        break;
    }
    
    return Promise.resolve(this.resolutionMessage);
  }
  
  async resetConsole(): Promise<string> {
    const consoleElement = document.getElementById("pregameConsole");

    consoleElement!.innerHTML = `<h3 class="pregameConsoleH3 pregameConsoleH">OUTPUT</h3>`

    return Promise.resolve(this.resolutionMessage);
  }
}

