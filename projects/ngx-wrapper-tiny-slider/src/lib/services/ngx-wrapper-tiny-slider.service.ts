import { ElementRef, Injectable } from '@angular/core';
import {
  TinySliderInstance,
  TinySliderSettings,
  tns
} from 'tiny-slider/src/tiny-slider';

@Injectable({
  providedIn: 'root'
})
export class NgxWrapperTinySliderService {
  public instance: TinySliderInstance = null;

  constructor() {}

  public initSlider(
    config: TinySliderSettings,
    elementRef: ElementRef
  ): TinySliderInstance {
    const extendConfig = Object.assign(
      { container: elementRef.nativeElement },
      config
    );
    this.instance = tns(extendConfig);
    return this.instance;
  }

  public getDefaultConfig() {
    const defaultConfig: TinySliderSettings = {
      items: 3,
      mode: 'carousel',
      speed: 400
    };
    return defaultConfig;
  }
}
