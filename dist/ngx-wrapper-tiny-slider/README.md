# Angular Wrapper for Tiny Slider (with SSR !)

A simple angular wrapper for [tiny slider](https://www.npmjs.com/package/tiny-slider). This project is a copy of [this package](https://www.npmjs.com/package/ngx-tiny-slider) because i need this wrapper up to date, and support SSR.

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
<ngx-wrapper-tiny-slider #tinySlider [config]="tinySliderConfig">
  <div class="item">
    <img src="https://picsum.photos/250/300" />
  </div>
  <div class="item">
    <img src="https://picsum.photos/200/300" />
  </div>
  <div class="item">
    <img src="https://picsum.photos/250/350" />
  </div>
</ngx-wrapper-tiny-slider>

<button (click)="goTo('prev')">prev</button>
<button (click)="goTo('next')">next</button>
```

##### app.component.ts

```ts
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';

export class AppComponent implements OnInit {
  // GET SLIDER INSTANCE HERE
  @ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;
  // ADD THE SLIDER CONFIG HERE (show tiny slider documentation for more)
  public tinySliderConfig: TinySliderSettings = {
    gutter: 20,
    items: 1,
    mouseDrag: true
  };

  constructor() {}

  ngOnInit() {}

  // USE THE INSTANCE OF THE SLIDER TO UPDATE SLIDER
  public goTo(foo: number | 'next' | 'prev' | 'first' | 'last'): void {
    this.tinySlider.goTo(foo);
  }
}
```

## Use the wrapper with \*ngFor

First add **[initManually]="true"** in the component properties

```html
<ngx-wrapper-tiny-slider
  #tinySlider
  [config]="tinySliderConfig"
  [initManually]="true"
></ngx-wrapper-tiny-slider>
```

when this property is active, **you have to initialize the slider yourself**. So add this method in your ngAfterViewInit (or where do you need) :

```ts
  ngAfterViewInit(): void {
    this.tinySlider.initSlider();
  }
```
