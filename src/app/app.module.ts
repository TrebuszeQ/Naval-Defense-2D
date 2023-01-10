import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//addons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// components
import { LevelWrapperComponent } from './level-wrapper/level-wrapper.component';
import { LevelComponent } from './level/level.component';
import { CharacterComponent } from './character/character.component';
import { WaterComponent } from './level/water/water.component';
import { PregameComponent } from './pregame/pregame.component';
import { WarshipCarouselComponent } from './warship-carousel/warship-carousel.component';
import { DescriptionPipe } from './character/pipes/description.pipe';
import { LevelCarouselComponent } from './level-carousel/level-carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    LevelWrapperComponent,
    LevelComponent,
    CharacterComponent,
    WaterComponent,
    PregameComponent,
    WarshipCarouselComponent,
    DescriptionPipe,
    LevelCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
