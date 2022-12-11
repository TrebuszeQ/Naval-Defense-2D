import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { LevelWrapperComponent } from './level-wrapper/level-wrapper.component';

const routes: Routes = [
 { path: 'game', component: LevelWrapperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
