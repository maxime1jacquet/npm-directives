import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import {
  tap,
  pluck,
  map,
  delay,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';

@Component({
  selector: 'ngx-cursor',
  template: `
    <div id="ngx-cursor" #ngxCursor>
      <span #ngxCursorEl></span>
    </div>
  `,
  styleUrls: ['./ngx-cursor.component.scss']
})
export class NgxCursorComponent implements AfterViewInit, OnChanges {
  @Input() cursor = true;
  @Input() color = '#000';
  @Input() txtcolor = '#FFF';
  @Input() size = '30px';
  @Input() opacity = 0.5;
  @Input() delay = 50;
  @Input() zindex = 999;

  @Input() words: string[] = [];
  @Input() selectors: string[] = [];

  public firstColor: string = this.color;
  public cursorType = [
    'cursor-active',
    'cursor-color',
    'cursor-opacity',
    'href',
    'routerlink'
  ];

  @ViewChild('ngxCursor') ngxCursor: ElementRef;
  @ViewChild('ngxCursorEl') ngxCursorEl: ElementRef;

  constructor() {}

  ngOnChanges() {
    this.setStyles();
  }

  ngAfterViewInit() {
    const mousemove$ = fromEvent(document, 'mousemove');

    const deplaceCursor$ = mousemove$.pipe(
      delay(this.delay),
      tap((e: MouseEvent) => {
        this.deplaceCursor(e.clientX, e.clientY);
      })
    );

    const elementsAttrs$ = mousemove$.pipe(
      pluck('target', 'attributes'),
      distinctUntilChanged(),
      map((attrs: any[]) => Object.values(attrs)),
      map((attrs: any[]) =>
        attrs.filter(attr => {
          const isStandard = this.cursorType.indexOf(attr.name) !== -1;
          const isCustom = this.customType().indexOf(attr.name) !== -1;
          return isStandard || isCustom;
        })
      )
    );

    const applyStylesFromAttr$ = elementsAttrs$.pipe(
      tap(_ => this.removeClass()),
      filter((arrayAttr: any[]) => arrayAttr.length > 0),
      tap((arrayAttr: any[]) => {
        arrayAttr.map(item => {
          this.HoverInElement(item, this.customType().indexOf(item.name));
        });
      })
    );

    const merge$ = merge(deplaceCursor$, elementsAttrs$, applyStylesFromAttr$);
    merge$.subscribe();
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
      // custom
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
    document.body.style.setProperty('--ngx-cursor-color', this.color);
    document.body.style.setProperty('--ngx-cursor-opacity', `${this.opacity}`);
    document.body.style.setProperty('--ngx-cursor-size', this.size);
    document.body.style.setProperty('--ngx-cursor-zindex', `${this.zindex}`);
    document.body.style.setProperty(
      '--ngx-cursor-txtcolor',
      `${this.txtcolor}`
    );

    if (this.cursor) {
      document.body.style.setProperty('--ngx-cursor', 'auto');
    } else {
      document.body.style.setProperty('--ngx-cursor', 'none');
    }
  }

  private customType(): string[] {
    return this.selectors.map(selector => `cursor-${selector}`);
  }

  private customTxtStyles(word: string): void {
    this.ngxCursorEl.nativeElement.innerHTML = word;
    document.body.style.setProperty('--ngx-cursor-opacity', `0.9`);
    document.body.style.setProperty('--ngx-cursor', 'none');
  }
}
