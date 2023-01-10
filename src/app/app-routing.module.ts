import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { LevelWrapperComponent } from './level-wrapper/level-wrapper.component';
import { LevelComponent } from './level/level.component';
import { PregameComponent } from './pregame/pregame.component';
import { WarshipCarouselComponent } from './warship-carousel/warship-carousel.component';

const routes: Routes = [
 { path: 'game', component: LevelWrapperComponent },
 { path: "pregame", component: PregameComponent },
 { path: "warships", component: WarshipCarouselComponent },
 { path: "levels", component: LevelComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
