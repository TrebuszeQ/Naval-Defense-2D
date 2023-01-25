import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//addons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// components
import { LevelWrapperComponent } from './level-wrapper/level-wrapper.component';
import { FirstLevelComponent } from './level-wrapper/levels/first-level/first-level.component';
import { CharacterComponent } from './character/character.component';
import { WaterComponent } from './level-wrapper/levels/water/water.component';
import { PregameComponent } from './pregame/pregame.component';
import { WarshipCarouselComponent } from './warship-carousel/warship-carousel.component';
import { LevelCarouselComponent } from './level-carousel/level-carousel.component';
import { WarshipDescriptionComponent } from './character/warship-description/warship-description.component';
// pipes
import { LevelDescriptionPipe } from './level-carousel/Pipes/level-description.pipe';
import { TorpedoComponent } from './torpedo/torpedo.component';
import { WeaponComponent } from './weapon/weapon.component';
import { SubmarineEnemyComponent } from './enemy-wrapper/submarine-enemy/submarine-enemy.component';
import { EnemyWrapperComponent } from './enemy-wrapper/enemy.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelWrapperComponent,
    FirstLevelComponent,
    CharacterComponent,
    WaterComponent,
    PregameComponent,
    WarshipCarouselComponent,
    LevelCarouselComponent,
    LevelDescriptionPipe,
    TorpedoComponent,
    WeaponComponent,
    WarshipDescriptionComponent,
    SubmarineEnemyComponent,
    EnemyWrapperComponent,
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
