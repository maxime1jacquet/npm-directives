import { ElementRef, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  TinySliderInstance,
  TinySliderSettings
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
  ): Observable<TinySliderInstance> {
    const extendConfig = Object.assign(
      { container: elementRef.nativeElement },
      config
    );

    /**
     * Import swiper here to support SSR
     */
    return from(import('tiny-slider/src/tiny-slider')).pipe(
      map((item: any) => {
        const tns = item.tns;
        this.instance = tns(extendConfig);
        return this.instance;
      })
    );
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
