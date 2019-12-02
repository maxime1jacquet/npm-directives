# Angular Parallax

Simple way to use parallax in angular 8

## 1- Install ngx-parallax package

```
npm i @yoozly/ngx-parallax
yarn i @yoozly/ngx-parallax
```

## 2- Import NgxParallaxModule in your angular module

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

## 3- Add the directive "ngx-parallax" in the HTML template

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

```html
<!-- rotate on scroll -->

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

```html
<!-- FadeIn on scroll -->

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

```html
<!-- Negative number or active property-->

<div class="image" ngx-parallax [speed]="-70" [active]="false">
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
