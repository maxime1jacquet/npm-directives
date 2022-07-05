import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';

import { MaterialModule } from './material.module';

//
// directives in npm
// import { NgxSimpleSliderModule } from 'ngx-simple-slider';
// import { NgxCursorModule } from 'ngx-cursor';

// directives
import { NgxSimpleCountdownModule } from './../../projects/ngx-simple-countdown/src/lib/ngx-simple-countdown.module';
// import { NgxSimpleCountdownModule } from 'dist/ngx-simple-countdown';

import { NgxParallaxModule } from './../../projects/ngx-parallax/src/lib/ngx-parallax.module';
// import { NgxParallaxModule } from 'dist/ngx-parallax';
// import { NgxParallaxModule } from '@yoozly/ngx-parallax';

import { NgxCursorModule } from './../../projects/ngx-cursor/src/lib/ngx-cursor.module';
// import { NgxCursorModule } from 'dist/ngx-cursor';

import { NgxWrapperTinySliderModule } from './../../projects/ngx-wrapper-tiny-slider/src/lib/ngx-wrapper-tiny-slider.module';
// import { NgxWrapperTinySliderModule } from 'dist/ngx-wrapper-tiny-slider';
// import { NgxWrapperTinySliderModule } from 'ngx-wrapper-tiny-slider';

// in progress
// import { NgxFieldErrorsModule } from './../../projects/ngx-field-errors/src/lib/ngx-field-errors.module';
// import { NgxSimpleSliderModule } from './../../projects/ngx-simple-slider/src/lib/ngx-simple-slider.module';

// component
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { CountdownComponent } from './countdown/countdown.component';
import { NgxParallaxComponent } from './ngx-parallax/ngx-parallax.component';
import { NgxCursorComponent } from './ngx-cursor/ngx-cursor.component';
import { Cursor1Component } from './ngx-cursor/cursor1/cursor1.component';
import { Cursor2Component } from './ngx-cursor/cursor2/cursor2.component';
import { InputTxtComponent } from './input-txt/input-txt.component';
import { WrapperTinySliderComponent } from './wrapper-tiny-slider/wrapper-tiny-slider.component';
import { NgxWrapperTinySliderService } from 'ngx-wrapper-tiny-slider';
// import { NgxFieldErrorsComponent } from './ngx-field-errors/ngx-field-errors.component';

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
    InputTxtComponent,
    WrapperTinySliderComponent
    // NgxFieldErrorsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxSimpleCountdownModule,
    NgxParallaxModule,
    NgxCursorModule,
    MaterialModule,
    NgxWrapperTinySliderModule
    // NgxSimpleSliderModule,
    // NgxFieldErrorsModule.forRoot(customErrorMessage, 'fr')
    // NgxFieldErrorsModule.forRoot()
  ],
  providers: [NgxWrapperTinySliderService],
  exports: [InputTxtComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
