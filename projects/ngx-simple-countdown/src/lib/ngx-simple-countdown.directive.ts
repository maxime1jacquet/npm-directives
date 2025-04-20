import {
  Directive,
  Input,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { interval, Observable, ReplaySubject } from 'rxjs';
import { tap, takeUntil, filter } from 'rxjs/operators';

import { CountdownResult, CountdownKeywords } from './models';
import { getDateNow, getCountdownResult, getLanguage } from './utils';
@Directive({
    selector: '[simpleCountdown]',
    standalone: false
})
export class NgxSimpleCountdownDirective implements OnInit, OnDestroy {
  @Input() dateTo: number;
  @Input() endMessage = 'countdown finish';
  @Input() language = 'en';
  @Input() reactive = true;
  @Input() styles =
    'font-size:20px;color:#FFF;background-color:#000;padding:10px 5px;font-weight:bold;min-width:40px;text-align:center;';

  @Output() finish: EventEmitter<void> = new EventEmitter();

  public countdownResult: CountdownResult;
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
    this.totalSecondes = this.dateTo - this.dateNow;
    this.updateSimpleCountdown(this.totalSecondes);

    this.interval$ = interval(1000).pipe(
      takeUntil(this.componentDestroyed(this)),
      filter((_) => this.reactive && this.totalSecondes > 0),
      tap((_) => {
        this.totalSecondes--;
        this.updateSimpleCountdown(this.totalSecondes);
      })
    );

    if (this.reactive) {
      this.interval$.subscribe();
    }
  }

  private createHTML(data: CountdownResult): void {
    const { day, hours, minutes, seconds } = data;
    let o = '';

    if (this.totalSecondes > 0) {
      o = '<div style="display:flex;">';

      if (day > 0) {
        o += `<div style="${this.styles}">
          ${day}${this.keywords.day}
          </div>`;
      }

      if (hours > 0 || day > 0) {
        o += `<div style="${this.styles}">
          ${hours}${this.keywords.hours}
        </div>`;
      }

      if ((minutes > 0 || hours > 0 || day > 0) && this.reactive) {
        o += `<div style="${this.styles}">
          ${minutes}${this.keywords.minutes}
        </div>`;
      }

      if (
        (seconds > 0 || minutes > 0 || hours > 0 || day > 0) &&
        this.reactive
      ) {
        o += `<div style="${this.styles}">
          ${seconds}${this.keywords.seconds}
        </div>`;
      }
      o += '</div>';
    } else {
      this.finish.emit();
      if (this.endMessage !== '') {
        o += `<div style="${this.styles}">${this.endMessage}</div>`;
      }
    }

    this.elementRef.nativeElement.innerHTML = o;
  }

  private updateSimpleCountdown(secondes: number): void {
    const countdownResult = getCountdownResult(secondes);
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
