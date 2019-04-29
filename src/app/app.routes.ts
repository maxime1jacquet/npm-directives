import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { CountdownComponent } from './countdown/countdown.component';
import { SliderComponent } from './slider/slider.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'slider',
    pathMatch: 'full'
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'countdown',
    component: CountdownComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'slider'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
