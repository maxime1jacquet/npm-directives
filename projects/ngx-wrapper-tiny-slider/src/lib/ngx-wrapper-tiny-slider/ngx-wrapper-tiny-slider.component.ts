import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';
import { first, take, takeWhile } from 'rxjs/operators';

import { NgxWrapperTinySliderService } from '../services/ngx-wrapper-tiny-slider.service';
import { NgxWrapperTinySliderInterface } from '../interfaces/ngx-tiny-slider-settings.interface';
import { TinySliderInstance } from 'tiny-slider';

@Component({
  selector: 'ngx-wrapper-tiny-slider',
  templateUrl: 'ngx-wrapper-tiny-slider.component.html',
  styleUrls: ['./tiny-slider.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxWrapperTinySliderComponent implements OnInit, OnDestroy {
  @Input() config: NgxWrapperTinySliderInterface = {};
  @ViewChild('slideItems', { static: true }) slideItemsContainerRef;

  public sliderInstance: TinySliderInstance;
  private aliveObservable = true;

  public domReady = new Subject();
  private defaultConfig = this.ngxWrapperTinySliderService.getDefaultConfig();

  constructor(
    private ngxWrapperTinySliderService: NgxWrapperTinySliderService
  ) {}

  ngOnInit() {
    if (this.config) {
      this.extendConfig();
    }

    if (!this.config.waitForDom) {
      this.initSlider();
    }
  }

  ngOnDestroy() {
    if (this.config.waitForDom) {
      this.aliveObservable = false;
    }

    if (this.sliderInstance && this.sliderInstance.destroy) {
      this.sliderInstance.destroy();
    }
  }

  private extendConfig() {
    Object.keys(this.config).forEach(
      (i) => (this.defaultConfig[i] = this.config[i])
    );
  }

  public initSlider() {
    this.ngxWrapperTinySliderService
      .initSlider(this.defaultConfig, this.slideItemsContainerRef)
      .pipe(take(1))
      .subscribe((item) => (this.sliderInstance = item));
  }

  public goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void {
    this.sliderInstance.goTo(target);
  }
}
