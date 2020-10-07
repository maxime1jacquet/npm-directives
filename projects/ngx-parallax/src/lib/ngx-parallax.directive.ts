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

@Directive({
  selector: '[ngx-parallax]'
})
export class ParallaxDirective implements OnDestroy, AfterViewInit {
  @Input() speed = 30;
  @Input() axe = 'y';
  @Input() property = 'transform';
  @Input() propertyValue = 'translate3d';
  @Input() active = true;

  private inViewport = true;
  private observer: IntersectionObserver;
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

    if (this.element && this.wr.nativeWindow && !this.observer) {
      this.initParallax();
    }
  }

  private initParallax(): void {
    this.observer = this.createObserver(0);
    this.observer.observe(this.element);

    const parallax$ = of('').pipe(
      takeUntil(this.componentDestroy$),
      filter(() => this.active && this.inViewport),
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
    this.inViewport = true;

    if (this.wr.nativeWindow && this.initialPosition === undefined) {
      this.initialPosition = this.wr.nativeWindow.pageYOffset;
      this.windowScroll$.subscribe();
      this.windowResize$.subscribe();
    }
  }

  private destroyParallax(): void {
    this.inViewport = false;
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

  private createObserver(pourcent: number) {
    const options = {
      rootMargin: '0px',
      threshold: pourcent / 100
    };

    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting || entry.intersectionRatio > 0;

    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (isIntersecting(entry)) {
          this.startParallax();
        } else {
          this.destroyParallax();
        }
      });
    }, options);
  }

  ngOnDestroy() {
    this.observer.disconnect();
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }
}
