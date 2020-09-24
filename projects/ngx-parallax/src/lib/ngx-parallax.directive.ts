import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { takeUntil, filter, map, debounceTime, mergeMap } from 'rxjs/operators';

import { BrowserWindowRef } from './services/windowref.service';
import { ifVisible } from './utils/visible.util';

@Directive({
  selector: '[ngx-parallax]'
})
export class ParallaxDirective implements OnDestroy, AfterViewInit {
  @Input() speed = 30;
  @Input() axe = 'y';
  @Input() property = 'transform';
  @Input() propertyValue = 'translate3d';

  private active = true;
  private element: HTMLElement;
  private initialPosition: number;
  private componentDestroy$ = new Subject<boolean>();
  private windowScroll$: Observable<number>;
  private windowResize$: Observable<number>;

  constructor(
    private hostElement: ElementRef,
    private renderer: Renderer2,
    private wr: BrowserWindowRef
  ) {}

  ngAfterViewInit() {
    this.element = this.hostElement.nativeElement;

    if (this.element && this.wr.nativeWindow) {
      this.initParallax();
      ifVisible(
        this,
        this.element,
        0,
        this.startParallax,
        this.destroyParallax
      );
    }
  }

  private initParallax(): void {
    const parallax$ = of('').pipe(
      takeUntil(this.componentDestroy$),
      filter(() => this.active),
      map(() => {
        const coef = this.calculateCoef();
        this.renderParallax(coef);
        return coef;
      })
    );

    this.windowScroll$ = fromEvent(this.wr.nativeWindow, 'scroll').pipe(
      mergeMap(() => parallax$)
    );

    this.windowResize$ = fromEvent(this.wr.nativeWindow, 'resize').pipe(
      debounceTime(500),
      mergeMap(() => parallax$)
    );
  }

  private startParallax(): void {
    this.active = true;

    if (this.wr.nativeWindow && this.initialPosition === undefined) {
      this.initialPosition = this.wr.nativeWindow.pageYOffset;
      this.windowScroll$.subscribe();
      this.windowResize$.subscribe();
    }
  }

  private destroyParallax(): void {
    this.active = false;
  }

  private calculateCoef(): number {
    return (
      (this.wr.nativeWindow.pageYOffset - this.initialPosition) *
      (this.speed / 100)
    );
  }

  private renderParallax(coef: number): void {
    this.renderer.setStyle(
      this.element,
      this.property,
      this.getPropertyValue(coef)
    );
  }

  private getPropertyValue(coef: number): string {
    let result = `${coef}px`;

    if (this.property === 'transform') {
      switch (this.propertyValue) {
        case 'translate3d':
          result = `translate3d(${this.getAxe(coef)})`;
          break;
        case 'scale':
          result = `scale(${coef})`;
          break;
        case 'rotate':
          result = `rotate(${coef}deg)`;
          break;
      }
    }

    switch (this.property) {
      case 'opacity':
        result = `${coef}`;
        break;
    }

    return result;
  }

  private getAxe(coef: number): string {
    let axe = [0, coef, 0];

    if (this.axe === 'x') {
      axe = [coef, 0, 0];
    } else if (this.axe === 'z') {
      axe = [0, 0, coef];
    }

    return `${axe[0]}px, ${axe[1]}px, ${axe[2]}px`;
  }

  ngOnDestroy() {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }
}
