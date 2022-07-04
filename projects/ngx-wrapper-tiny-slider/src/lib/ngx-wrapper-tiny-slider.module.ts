import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWrapperTinySliderComponent } from './ngx-wrapper-tiny-slider/ngx-wrapper-tiny-slider.component';
import { NgxWrapperTinySliderService } from './services/ngx-wrapper-tiny-slider.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxWrapperTinySliderComponent],
  exports: [NgxWrapperTinySliderComponent],
  providers: [NgxWrapperTinySliderService]
})
export class NgxWrapperTinySliderModule {}
