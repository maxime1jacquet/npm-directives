import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';
import { first, takeWhile } from 'rxjs/operators';

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

    if (this.config.waitForDom) {
      this.listenForDomReady();
    } else {
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

  private listenForDomReady() {
    this.domReady
      .pipe(
        first(),
        takeWhile(() => this.aliveObservable)
      )
      .subscribe(() => this.initSlider());
  }

  private extendConfig() {
    Object.keys(this.config).forEach(
      (i) => (this.defaultConfig[i] = this.config[i])
    );
  }

  private initSlider() {
    this.sliderInstance = this.ngxWrapperTinySliderService.initSlider(
      this.defaultConfig,
      this.slideItemsContainerRef
    );
  }

  public goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void {
    this.sliderInstance.goTo(target);
  }
}
