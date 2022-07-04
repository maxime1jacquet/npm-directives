# Angular Wrapper for Tiny Slider (ngx-wrapper-tiny-slider)

A simple angular wrapper for [tiny slider](https://www.npmjs.com/package/tiny-slider). This project is a copy of [this package](https://www.npmjs.com/package/ngx-tiny-slider) because i need this wrapper up to date.

# Getting Started

## Link

- [github repository](https://github.com/maxime1jacquet/npm-directives)
- [my twitter](https://twitter.com/maxime1jacquet)
- [tiny slider examples](https://ganlanyuan.github.io/tiny-slider/demo/)

## Install

```sh
npm i ngx-simple-countdown
```

**Important !** To compile we need to add this line in your tsconfig.json, because there is a bug inside the tiny slider librairy

```json
  "compilerOptions": {
    ...
    "skipLibCheck": true <----
  }
```

## Import in your angular module (or feature module)

##### app.module.ts

```ts
import { NgxWrapperTinySliderModule } from 'ngx-wrapper-tiny-slider';

@NgModule({
  imports: [NgxWrapperTinySliderModule]
})
export class AppModule {}
```

## Use the wrapper in your component

##### app.component.html

```html
<ngx-wrapper-tiny-slider [config]="tinySliderConfig" #tinySlider>
  <ng-container class="items">
    <div class="item">
      <img src="https://picsum.photos/250/300" />
    </div>
    <div class="item">
      <img src="https://picsum.photos/200/300" />
    </div>
    <div class="item">
      <img src="https://picsum.photos/250/350" />
    </div>
  </ng-container>
</ngx-wrapper-tiny-slider>

<button (click)="prev()">prev</button>
<button (click)="next()">next</button>
```

##### app.component.ts

```ts
import { NgxWrapperTinySliderInterface } from 'projects/ngx-wrapper-tiny-slider/src/public-api';
import { TinySliderInstance } from 'tiny-slider';

export class AppComponent implements OnInit {
  // GET SLIDER INSTANCE HERE
  @ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;
  // ADD THE SLIDER CONFIG HERE (show tiny slider documentation for more)
  public tinySliderConfig: NgxWrapperTinySliderInterface = {
    gutter: 20,
    items: 1,
    mouseDrag: true
  };

  constructor() {}
  ngOnInit() {}

  // USE THE INSTANCE OF THE SLIDER TO UPDATE SLIDER
  public prev(): void {
    this.tinySlider.goTo('prev');
  }
  public next(): void {
    // number | 'next' | 'prev' | 'first' | 'last'
    this.tinySlider.goTo('next');
  }
  public otherMethods(): void {
    this.tinySlider.updateSliderHeight();
    this.tinySlider.play();
    this.tinySlider.pause();
    this.tinySlider.refresh();
    // etc ...
  }
}
```
