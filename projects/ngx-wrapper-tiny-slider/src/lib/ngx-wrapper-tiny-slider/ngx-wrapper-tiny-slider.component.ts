import {
  Component,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';

import { NgxWrapperTinySliderService } from '../services/ngx-wrapper-tiny-slider.service';
import { NgxWrapperTinySliderInterface } from '../interfaces/ngx-tiny-slider-settings.interface';
import { BrowserWindowRef } from '../services/windowref.service';
import { isPlatformBrowser } from '@angular/common';

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

  public domReady = new Subject();
  private ngxWrapperTinySliderService!: NgxWrapperTinySliderService;
  private defaultConfig: TinySliderSettings = {
    items: 3,
    mode: 'carousel',
    speed: 400
  };

  constructor(
    private wr: BrowserWindowRef,
    @Inject(PLATFORM_ID) private platformId: string,
    private injector: Injector
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngxWrapperTinySliderService = <NgxWrapperTinySliderService>(
        this.injector.get(NgxWrapperTinySliderService)
      );
    }
  }

  ngOnInit() {
    if (this.wr.nativeWindow) {
      if (this.config) {
        this.extendConfig();
      }

      if (!this.config.waitForDom) {
        this.initSlider();
      }
    }
  }

  ngOnDestroy() {
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
    if (this.wr.nativeWindow) {
      this.ngxWrapperTinySliderService
        .initSlider(this.defaultConfig, this.slideItemsContainerRef)
        .pipe(take(1))
        .subscribe((item) => (this.sliderInstance = item));
    }
  }

  public goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void {
    if (this.wr.nativeWindow) {
      this.sliderInstance.goTo(target);
      // this.sliderInstance
    }
  }
}
