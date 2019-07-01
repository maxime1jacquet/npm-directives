import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { CountdownComponent } from './countdown/countdown.component';
import { AppRoutingModule } from './app.routes';

// import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
// import { NgxSimpleSliderModule } from 'ngx-simple-slider';
import { NgxSimpleCountdownModule } from './../../projects/ngx-simple-countdown/src/lib/ngx-simple-countdown.module';
import { NgxSimpleSliderModule } from './../../projects/ngx-simple-slider/src/lib/ngx-simple-slider.module';

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
