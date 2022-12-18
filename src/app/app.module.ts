import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// components
import { LevelWrapperComponent } from './level-wrapper/level-wrapper.component';
import { LevelComponent } from './level/level.component';
import { CharacterComponent } from './character/character.component';
import { WaterComponent } from './water/water.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelWrapperComponent,
    LevelComponent,
    CharacterComponent,
    WaterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
