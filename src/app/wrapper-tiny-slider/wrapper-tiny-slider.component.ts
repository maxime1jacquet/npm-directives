import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxWrapperTinySliderInterface } from 'projects/ngx-wrapper-tiny-slider/src/public-api';
import { TinySliderInstance } from 'tiny-slider';

@Component({
  selector: 'wrapper-tiny-slider',
  templateUrl: './wrapper-tiny-slider.component.html',
  styleUrls: ['./wrapper-tiny-slider.component.scss']
})
export class WrapperTinySliderComponent implements OnInit {
  @ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;
  public tinySliderConfig: NgxWrapperTinySliderInterface = {
    gutter: 20,
    items: 1,
    mouseDrag: true
  };

  constructor() {}

  ngOnInit() {}

  prev() {
    this.tinySlider.goTo('prev');
  }
  next() {
    this.tinySlider.goTo('next');
  }
  otherMethods() {
    this.tinySlider.updateSliderHeight();
    this.tinySlider.play();
    this.tinySlider.pause();
    this.tinySlider.refresh();
    // etc ...
  }
}
