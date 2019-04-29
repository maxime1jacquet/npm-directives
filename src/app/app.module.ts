import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { CountdownComponent } from './countdown/countdown.component';
import { AppRoutingModule } from './app.routes';

import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { NgxSimpleSliderModule } from 'ngx-simple-slider';

@NgModule({
  declarations: [AppComponent, SliderComponent, CountdownComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSimpleCountdownModule,
    NgxSimpleSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
