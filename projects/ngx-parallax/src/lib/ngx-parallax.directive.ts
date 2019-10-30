import {
  Directive,
  OnInit,
  Input,
  ElementRef,
  Renderer2,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { tap, takeUntil, filter, map } from 'rxjs/operators';

import { BrowserWindowRef } from './services/windowref.service';
import { ifVisible } from './utils/visible.util';

@Directive({
  selector: '[ngx-parallax]'
})
export class ParallaxDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() speed = 30;
  @Input() axe = 'y';
  @Input() property = 'transform';
  @Input() propertyValue = 'translate3d';
  @Input() active = true;

  private element: HTMLElement;
  private initialPosition: number;
  private componentDestroy$ = new Subject<boolean>();
  private windowScroll$: Observable<any>;

  constructor(
    private hostElement: ElementRef,
    private renderer: Renderer2,
    private wr: BrowserWindowRef
  ) {}

  ngOnInit() {
    this.element = this.hostElement.nativeElement;
    this.initParallax();
  }

  ngAfterViewInit() {
    if (this.element) {
      ifVisible(this, this.element, 0, this.startParallax);
    }
  }

  private initParallax(): void {
    if (this.wr.nativeWindow) {
      this.windowScroll$ = fromEvent(this.wr.nativeWindow, 'scroll').pipe(
        takeUntil(this.componentDestroy$),
        filter(_ => this.wr.nativeWindow),
        filter(_ => this.active),
        map(_ => this.calculateCoef()),
        tap((coef: number) => this.renderParallax(coef))
      );
    }
  }

  private startParallax(): void {
    if (this.wr.nativeWindow && this.initialPosition === undefined) {
      this.initialPosition = this.wr.nativeWindow.pageYOffset;
      this.windowScroll$.subscribe();
    }
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
