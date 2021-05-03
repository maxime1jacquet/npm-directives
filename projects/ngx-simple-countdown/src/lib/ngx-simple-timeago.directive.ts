import { Directive, Input, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, ReplaySubject } from 'rxjs';
import { tap, takeUntil, filter } from 'rxjs/operators';

import { CountdownResult, CountdownKeywords } from './models';
import { getCountdownResult, getDateNow, getLanguage } from './utils';

@Directive({
  selector: '[simpleTimeago]'
})
export class NgxSimpleTimeagoDirective implements OnInit, OnDestroy {
  @Input() date: number;
  @Input() language = 'en';
  @Input() reactive = true;

  public dateNow: number;
  public interval$: Observable<number>;
  public keywords: CountdownKeywords;
  public totalSecondes: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.dateNow = getDateNow();
    this.keywords = getLanguage(this.language);
    this.initSimpleCountdown();
  }

  ngOnDestroy() {}

  private initSimpleCountdown(): void {
    this.totalSecondes = this.dateNow - this.date;
    this.updateSimpleCountdown(this.totalSecondes);

    this.interval$ = interval(20000).pipe(
      takeUntil(this.componentDestroyed(this)),
      filter(() => this.reactive && this.totalSecondes > 0),
      tap(() => {
        this.totalSecondes += 20;
        this.updateSimpleCountdown(this.totalSecondes);
      })
    );

    if (this.reactive) {
      this.interval$.subscribe();
    }
  }

  private createHTML(data: CountdownResult): void {
    const { day, hours, minutes } = data;
    let o = '';

    if (this.totalSecondes > 0) {
      if (this.totalSecondes <= 60) {
        o += this.keywords.now;
      } else {
        o += `${this.keywords.timeago} `;
        if (data.day > 0) {
          o += `${data.day}${this.keywords.day} `;
        }
        if (hours > 0 || day > 0) {
          o += `${hours}${this.keywords.hours} `;
        }
        if (minutes > 0 || hours > 0 || day > 0) {
          o += `${minutes}${this.keywords.minutes} `;
        }
      }
    }

    this.elementRef.nativeElement.innerHTML = o;
  }

  private updateSimpleCountdown(secondes: number): void {
    const countdownResult: CountdownResult = getCountdownResult(secondes);
    this.createHTML(countdownResult);
  }

  private componentDestroyed(component: OnDestroy) {
    const oldNgOnDestroy = component.ngOnDestroy;
    const destroyed$ = new ReplaySubject<void>(1);

    component.ngOnDestroy = () => {
      oldNgOnDestroy.apply(component);
      destroyed$.next(undefined);
      destroyed$.complete();
    };

    return destroyed$;
  }
}
