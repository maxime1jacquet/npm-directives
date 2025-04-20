# Angular Simple Countdown (Standalone or ngModule)

The most simple way to display a countdown in angular 19. This package is compatible with standalone component or ngModule.

# Getting Started

#### Links

- [demo](https://ngx-simple.maximejacquet.fr/countdown)
- [github repository](https://github.com/maxime1jacquet/ngx-simple-countdown)
- [twitter/x](https://twitter.com/maxime1jacquet)

## 1- Install

```
npm i ngx-simple-countdown
yarn i ngx-simple-countdown
```

## 2- Import in your project

Since Angular 17, you have 2 ways to import the directive (standalone or ngModule)

### 2.a- With standalone component

```ts
import { NgxSimpleCountdownStandaloneDirective } from 'ngx-simple-countdown';

@Component({
  selector: 'my-standalone-component',
  standalone: true,
  imports: [
    ...
    NgxSimpleCountdownStandaloneDirective
  ]
})
export class MyStandaloneComponent implements OnInit {
...
}
```

### 2.b- With ngModule

```ts
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';

@NgModule({
  imports: [NgxSimpleCountdownModule]
})
export class AppModule {}
```

## 3- Use directive "simpleCountdown" in a new div in your angular component

```html
<div class="countdown" simpleCountdown [dateTo]="1581242400"></div>

<!-- 
  convert your date to timestamps
  http://www.timestamp.fr/ 
-->
```

## 4- You can add some parameters

```html
<div
  class="countdown"
  simpleCountdown
  [dateTo]="1581242400"
  [language]="'fr'"
  [endMessage]="'custom end message'"
  [reactive]="false"
  [styles]="'
    font-size: 20px;
    color: red;
    background-color: white;
    padding: 10px 4px;
    font-weight: bold;
  '"
  (finish)="onfinish()"
></div>
```

## Parameters Docs

| type   | Name parameter | default value                                                                       | custom value                                                                                                       |
| ------ | -------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| input  | language       | en                                                                                  | en/English - fr/Francais - pl/Polski - de/Deutschland - es/España - pt/Portugal - cs/Česká republika - ge/Georgian |
| input  | endMessage     | "countdown finish"                                                                  | custom the end message (or empty message)                                                                          |
| input  | reactive       | true                                                                                | false (remove seconds and minutes)                                                                                 |
| input  | styles         | "font-size:20px;color:#FFF;background-color:#000;padding:10px 5px;font-weight:bold" | remplace my default                                                                                                |
| output | finish         | x                                                                                   | callback when the countdown was finish                                                                             |

**if your language is not supported please [contact me](https://twitter.com/maxime1jacquet)**

### Add styles in your div

##### app.component.scss

you can add somes styles in your element

```css
.countdown {
  border: 2px solid red;
  position: absolute;
  top: 0;
  right: 0;
}
```

# And that's it, Enjoy !
