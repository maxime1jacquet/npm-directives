import { Directive, Input, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as fromModel from './models';
import { interval, Observable, ReplaySubject } from 'rxjs';
import { tap, takeUntil, filter } from 'rxjs/operators';

@Directive({
  selector: '[simpleCountdown]'
})
export class NgxSimpleCountdownDirective implements OnInit, OnDestroy {
  @Input() dateTo: number;
  @Input() language = 'en';
  @Input() reactive = true;
  @Input() endMessage = 'countdown finish';
  @Input() hideUnit = '';
  @Input() styles =
    'font-size:20px;color:#FFF;background-color:#000;padding:10px 5px;font-weight:bold;min-width:40px;text-align:center;';

  public keywords: fromModel.CountdownKeywords;
  public countdownResult: fromModel.CountdownResult;
  public dateNow: number;
  public totalSecondes: number;
  public interval$: Observable<number>;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.getDateNow();
    this.setLanguage(this.language);
    this.initSimpleCountdown();
  }

  ngOnDestroy() {}

  private initSimpleCountdown(): void {
    this.totalSecondes = this.dateTo - this.dateNow;
    this.countdownResult = this.updateSimpleCountdown(this.totalSecondes);
    this.createHTML();

    this.interval$ = interval(1000).pipe(
      takeUntil(this.componentDestroyed(this)),
      filter(_ => this.reactive && this.totalSecondes > 0),
      tap(_ => this.totalSecondes--),
      tap(
        _ =>
          (this.countdownResult = this.updateSimpleCountdown(
            this.totalSecondes
          ))
      ),
      tap(_ => this.createHTML())
    );

    this.interval$.subscribe();
  }

  private createHTML(): void {
    let o = '';

    if (this.totalSecondes > 0) {
      o = '<div style="display:flex;">';

      if (this.isContent('d')) {
        if (this.countdownResult.day > 0) {
          o += `<div style="${this.styles}">
          ${this.countdownResult.day}${this.keywords.day}
          </div>`;
        }
      }

      if (this.isContent('h')) {
        if (this.countdownResult.hours > 0 || this.countdownResult.day > 0) {
          o += `<div style="${this.styles}">
          ${this.countdownResult.hours}${this.keywords.hours}
        </div>`;
        }
      }

      if (this.isContent('m')) {
        if (
          (this.countdownResult.minutes > 0 ||
            this.countdownResult.hours > 0 ||
            this.countdownResult.day > 0) &&
          this.reactive
        ) {
          o += `<div style="${this.styles}">
          ${this.countdownResult.minutes}${this.keywords.minutes}
        </div>`;
        }
      }

      if (this.isContent('s')) {
        if (
          (this.countdownResult.seconds > 0 ||
            this.countdownResult.minutes > 0 ||
            this.countdownResult.hours > 0 ||
            this.countdownResult.day > 0) &&
          this.reactive
        ) {
          o += `<div style="${this.styles}">
          ${this.countdownResult.seconds}${this.keywords.seconds}
        </div>`;
        }
        o += '</div>';
      }
    } else {
      if (this.endMessage !== '') {
        o += `<div style="${this.styles}">${this.endMessage}</div>`;
      }
    }

    this.elementRef.nativeElement.innerHTML = o;
  }

  private isContent(unit: string): boolean {
    return !this.hideUnit.includes(unit);
  }

  private updateSimpleCountdown(secondes: number): fromModel.CountdownResult {
    const Seconds = Math.floor((secondes / 1) % 60);
    const Minutes = Math.floor((secondes / 1 / 60) % 60);
    const Hours = Math.floor((secondes / (1 * 60 * 60)) % 24);
    const Day = Math.floor(secondes / (1 * 60 * 60 * 24));

    return {
      day: Day,
      hours: Hours,
      minutes: Minutes,
      seconds: Seconds
    };
  }

  private getDateNow(): void {
    this.dateNow = Math.floor(Date.now() / 1000);
  }

  private setLanguage(language: string): void {
    if (language === 'fr') {
      this.keywords = {
        seconds: 's',
        minutes: 'm',
        hours: 'h',
        day: 'j'
      };
    } else if (language === 'de') {
      this.keywords = {
        seconds: 'z',
        minutes: 'm',
        hours: 's',
        day: 't'
      };
    } else if (language === 'es' || language === 'pt') {
      this.keywords = {
        seconds: 's',
        minutes: 'm',
        hours: 's',
        day: 'd'
      };
    } else if (language === 'cs') {
      this.keywords = {
        seconds: 's',
        minutes: 'm',
        hours: 'h',
        day: 'd'
      };
    } else if (language === 'pl') {
      this.keywords = {
        seconds: 's',
        minutes: 'm',
        hours: 'g',
        day: 'd'
      };
    } else {
      this.keywords = {
        seconds: 's',
        minutes: 'm',
        hours: 'h',
        day: 'd'
      };
    }
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
