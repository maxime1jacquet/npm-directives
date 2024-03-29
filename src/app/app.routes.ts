import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { CountdownComponent } from './countdown/countdown.component';
import { CountdownStandaloneComponent } from './countdown-standalone/countdown-standalone.component';
import { NgxParallaxComponent } from './ngx-parallax/ngx-parallax.component';
import { NgxParallaxStandaloneComponent } from './ngx-parallax-standalone/ngx-parallax-standalone.component';
import { NgxCursorComponent } from './ngx-cursor/ngx-cursor.component';
import { Cursor1Component } from './ngx-cursor/cursor1/cursor1.component';
import { Cursor2Component } from './ngx-cursor/cursor2/cursor2.component';
import { WrapperTinySliderComponent } from './wrapper-tiny-slider/wrapper-tiny-slider.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'countdown',
    pathMatch: 'full'
  },
  {
    path: 'wrapper-tiny-slider',
    component: WrapperTinySliderComponent
  },
  {
    path: 'countdown',
    component: CountdownComponent
  },
  {
    path: 'countdown-standalone',
    component: CountdownStandaloneComponent
  },
  {
    path: 'parallax',
    component: NgxParallaxComponent
  },
  {
    path: 'parallax-standalone',
    component: NgxParallaxStandaloneComponent
  },
  {
    path: 'cursor',
    component: NgxCursorComponent,
    children: [
      {
        path: '',
        component: Cursor1Component
      },
      {
        path: '1',
        component: Cursor2Component
      }
    ]
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
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'top',
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
