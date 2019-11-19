import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { CountdownComponent } from './countdown/countdown.component';
import { NgxParallaxComponent } from './ngx-parallax/ngx-parallax.component';
import { AppRoutingModule } from './app.routes';

// import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
// import { NgxSimpleSliderModule } from 'ngx-simple-slider';
import { NgxSimpleCountdownModule } from './../../projects/ngx-simple-countdown/src/lib/ngx-simple-countdown.module';
import { NgxSimpleSliderModule } from './../../projects/ngx-simple-slider/src/lib/ngx-simple-slider.module';
import { NgxParallaxModule } from './../../projects/ngx-parallax/src/lib/ngx-parallax.module';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    CountdownComponent,
    NgxParallaxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSimpleCountdownModule,
    NgxSimpleSliderModule,
    NgxParallaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
