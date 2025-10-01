# Angular Parallax (SSR)

Simple way to Use parallax effect with Angular 20 compatible universal (SRR) (standalone and ngModule)

## 1- Install @yoozly/ngx-parallax package

```
npm i @yoozly/ngx-parallax
yarn i @yoozly/ngx-parallax
```

## 2- Import in your project

Since Angular 17, you have 2 ways to import the directive (standalone or ngModule)

### 2.a- With standalone component

```ts
import { ParallaxStandaloneDirective } from '@yoozly/ngx-parallax';

@Component({
  selector: 'my-standalone-component',
  standalone: true,
  imports: [
    ...
    ParallaxStandaloneDirective
  ]
})
export class MyStandaloneComponent implements OnInit {
...
}
```

### 2.b- With ngModule

```ts
import { NgxParallaxModule } from '@yoozly/ngx-parallax';

@NgModule({
  imports: [
    NgxParallaxModule,
    ...
  ]
})
export class AppModule {}
```

## 3- Add the directive "ngx-parallax" in the angular component HTML template

```html
<div class="image">
  <img src="./some-image.jpg" ngx-parallax />
</div>
```

**Here you apply a css transform with translate3d on Y axis**, if you want the famous parallax effect you can add this following css :

```css
.image {
  height: 500px;
  position: relative;
  overflow: hidden;
}

.image > img {
  position: absolute;
  top: -200px;
  left: 0;
  width: 100%;
  height: calc(100% + 200px);
  object-fit: cover;
}
```

## Parameters to custom our directive

**Change transform properties**

```html
<div class="image">
  <img
    src="./some-image.jpg"
    alt=""
    ngx-parallax
    property="transform"
    propertyValue="rotate"
    [speed]="50"
  />
</div>
```

**Change CSS properties**

```html
<div class="image">
  <img
    src="./some-image.jpg"
    alt=""
    ngx-parallax
    [speed]="0.3"
    property="opacity"
  />
</div>
```

**Negative number**

```html
<div class="image" ngx-parallax [speed]="-70">
  <img src="assets/1.jpg" alt="" />
</div>
```

**Stop reactively parralax**

```html
<div class="image" ngx-parallax [active]="false">
  <img src="assets/1.jpg" alt="" />
</div>

<div class="image" ngx-parallax [active]="boolean$ | async">
  <img src="assets/1.jpg" alt="" />
</div>
```

# API

| Name parameter | default value | custom value                         | usage                              |
| -------------- | ------------- | ------------------------------------ | ---------------------------------- |
| speed          | 20            | a numeric value                      | play with the parallax sensitivity |
| active         | true          | false                                | active or not parallax             |
| property       | transform     | all css property (opacity, width...) | to change the parallax usage       |
| propertyValue  | translate3d   | scale, rotate                        | add some other transformations     |
| axe            | y             | x                                    | to change the transform axe        |
