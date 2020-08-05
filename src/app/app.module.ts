import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';

import { MaterialModule } from './material.module';

//
// directives in npm
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { NgxSimpleSliderModule } from 'ngx-simple-slider';
import { NgxCursorModule } from 'ngx-cursor';
import { NgxParallaxModule } from '@yoozly/ngx-parallax';

// directives
// import { NgxSimpleCountdownModule } from './../../projects/ngx-simple-countdown/src/lib/ngx-simple-countdown.module';
// import { NgxSimpleSliderModule } from './../../projects/ngx-simple-slider/src/lib/ngx-simple-slider.module';
// import { NgxCursorModule } from './../../projects/ngx-cursor/src/lib/ngx-cursor.module';
// import { NgxParallaxModule } from './../../projects/ngx-parallax/src/lib/ngx-parallax.module';
import { NgxFieldErrorsModule } from './../../projects/ngx-field-errors/src/lib/ngx-field-errors.module';

// component
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { CountdownComponent } from './countdown/countdown.component';
import { NgxParallaxComponent } from './ngx-parallax/ngx-parallax.component';
import { NgxCursorComponent } from './ngx-cursor/ngx-cursor.component';
import { Cursor1Component } from './ngx-cursor/cursor1/cursor1.component';
import { Cursor2Component } from './ngx-cursor/cursor2/cursor2.component';
import { NgxFieldErrorsComponent } from './ngx-field-errors/ngx-field-errors.component';
import { InputTxtComponent } from './input-txt/input-txt.component';

const customErrorMessage = {
  pattern: 'Erreur custom qui indique que le pattern est incorrecte'
};

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    CountdownComponent,
    NgxParallaxComponent,
    NgxCursorComponent,
    Cursor1Component,
    Cursor2Component,
    NgxFieldErrorsComponent,
    InputTxtComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxSimpleCountdownModule,
    NgxSimpleSliderModule,
    NgxParallaxModule,
    NgxCursorModule,
    MaterialModule,
    NgxFieldErrorsModule.forRoot(customErrorMessage, 'fr')
    // NgxFieldErrorsModule.forRoot()
  ],
  providers: [],
  exports: [InputTxtComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
