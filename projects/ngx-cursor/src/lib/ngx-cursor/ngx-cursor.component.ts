import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { fromEvent, Subject, Subscription, combineLatest } from 'rxjs';
import {
  tap,
  pluck,
  map,
  delay,
  distinctUntilChanged,
  filter,
  takeUntil
} from 'rxjs/operators';

import { BrowserWindowRef } from '../services/windowref.service';

@Component({
  selector: 'ngx-cursor',
  template: `
    <div id="ngx-cursor" #ngxCursor>
      <span #ngxCursorEl></span>
    </div>
  `,
  styleUrls: ['./ngx-cursor.component.scss']
})
export class NgxCursorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() cursor = true;
  @Input() color = '#000';
  @Input() txtcolor = '#FFF';
  @Input() size = '30px';
  @Input() opacity = 0.4;
  @Input() delay = 50;
  @Input() zindex = 999;
  @Input() words: string[] = [];
  @Input() selectors: string[] = [];

  @ViewChild('ngxCursor') ngxCursor: ElementRef;
  @ViewChild('ngxCursorEl') ngxCursorEl: ElementRef;

  public merge$: Subscription;
  private componentDestroy$ = new Subject<boolean>();
  public firstColor: string;
  public cursorType = [
    'cursor-active',
    'cursor-color',
    'cursor-opacity',
    'href',
    'routerlink'
  ];

  constructor(private wr: BrowserWindowRef) {}

  ngOnChanges() {
    this.setStyles();
  }

  ngAfterViewInit() {
    if (this.wr.nativeWindow) {
      this.firstColor = this.color;
      const mousemove$ = fromEvent(this.wr.nativeWindow, 'mousemove');

      const deplaceCursor$ = mousemove$.pipe(
        delay(this.delay),
        tap((e: MouseEvent) => {
          this.deplaceCursor(e.clientX, e.clientY);
        })
      );

      const getElementsAttrs$ = mousemove$.pipe(
        pluck('path', '1', 'attributes'),
        distinctUntilChanged(),
        map((attrsEl1: any) => {
          return Object.values(attrsEl1).filter((attr: any) => {
            const isStandard = this.cursorType.indexOf(attr.name) !== -1;
            const isCustom = this.customType().indexOf(attr.name) !== -1;
            return isStandard || isCustom;
          });
        })
      );

      // const getAncestorsAttrs$ = mousemove$.pipe(
      //   pluck('target', 'parentNode', 'attributes'),
      //   distinctUntilChanged(),
      //   filter((attrs: any[]) => attrs !== undefined),
      //   map((attrs: any[]) =>
      //     Object.values(attrs).filter(attr => {
      //       const isStandard = this.cursorType.indexOf(attr.name) !== -1;
      //       const isCustom = this.customType().indexOf(attr.name) !== -1;
      //       return isStandard || isCustom;
      //     })
      //   )
      // );

      const applyStylesFromAttr$ = getElementsAttrs$.pipe(
        tap(_ => this.removeClass()),
        filter((arrayAttr: any[]) => arrayAttr.length > 0),
        tap((arrayAttr: any[]) => {
          arrayAttr.map(item => {
            this.HoverInElement(item, this.customType().indexOf(item.name));
          });
        })
      );

      this.merge$ = combineLatest(
        deplaceCursor$,
        getElementsAttrs$,
        applyStylesFromAttr$
        // getAncestorsAttrs$,
      )
        .pipe(takeUntil(this.componentDestroy$))
        .subscribe();
    }
  }

  private HoverInElement(item: any, i: number): void {
    if (
      item.name === 'href' ||
      item.name === 'routerlink' ||
      item.name === 'cursor-active'
    ) {
      this.addClass('active');
    } else if (item.name === 'cursor-color') {
      this.color = item.value;
      this.setStyles();
    } else {
      this.addClass('active');
      this.customTxtStyles(this.words[i]);
    }
  }

  private addClass(className: string): void {
    this.ngxCursor.nativeElement.classList.add(className);
  }

  private removeClass(): void {
    this.color = this.firstColor;
    this.ngxCursor.nativeElement.classList.remove('active');
    this.ngxCursorEl.nativeElement.innerHTML = '';
    this.setStyles();
  }

  private deplaceCursor(x: number, y: number): void {
    this.ngxCursor.nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  private setStyles(): void {
    if (this.wr.nativeWindow) {
      this.wr.nativeWindow.document.body.style.setProperty(
        '--ngx-cursor-color',
        this.color
      );
      this.wr.nativeWindow.document.body.style.setProperty(
        '--ngx-cursor-opacity',
        `${this.opacity}`
      );
      this.wr.nativeWindow.document.body.style.setProperty(
        '--ngx-cursor-size',
        this.size
      );
      this.wr.nativeWindow.document.body.style.setProperty(
        '--ngx-cursor-zindex',
        `${this.zindex}`
      );
      this.wr.nativeWindow.document.body.style.setProperty(
        '--ngx-cursor-txtcolor',
        `${this.txtcolor}`
      );

      if (this.cursor) {
        this.wr.nativeWindow.document.body.style.setProperty(
          '--ngx-cursor',
          'auto'
        );
      } else {
        this.wr.nativeWindow.document.body.style.setProperty(
          '--ngx-cursor',
          'none'
        );
      }
    }
  }

  private customType(): string[] {
    return this.selectors.map(selector => `cursor-${selector}`);
  }

  private customTxtStyles(word: string): void {
    if (this.wr.nativeWindow) {
      if (word) {
        this.ngxCursorEl.nativeElement.innerHTML = word;
      }
      this.wr.nativeWindow.document.body.style.setProperty(
        '--ngx-cursor-opacity',
        `0.9`
      );
      this.wr.nativeWindow.document.body.style.setProperty(
        '--ngx-cursor',
        'none'
      );
    }
  }

  ngOnDestroy() {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }
}
