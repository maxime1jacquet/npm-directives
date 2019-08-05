# Angular Simple Countdown (ngx-simple-countdown)

The most simple way to display a countdown in angular 7

# Getting Started

## Links

- [demo](https://ngx-simple.maximejacquet.fr/countdown)
- [github repository](https://github.com/maxime1jacquet/ngx-simple-countdown)
- [my twitter](https://twitter.com/maxime1jacquet)

## Install

```
npm i ngx-simple-countdown
yarn i ngx-simple-countdown
```

## Import in your angular module (or feature module)

##### app.module.ts

```ts
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';

@NgModule({
  imports: [NgxSimpleCountdownModule]
})
export class AppModule {}
```

## Add "simpleCountdown" in a new div in your component

##### app.component.html

```html
<div class="countdown" simpleCountdown [dateTo]="1581242400"></div>

<!-- 
  convert your date to timestamps
  http://www.timestamp.fr/ 
-->
```

## And you can add some parameters

```html
<div
  class="countdown"
  simpleCountdown
  [dateTo]="1581242400"
  [language]="'fr'"
  [endMessage]="'custom end message'"
  [reactive]="false"
  [hideUnit]="'ds"
  [styles]="'
    font-size: 20px;
    color: red;
    background-color: white;
    padding: 10px 4px;
    font-weight: bold;
  '"
></div>
```

## Parameters Docs

| Name parameter | default value                                                                       | custom value                                                                                         |
| -------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| language       | en                                                                                  | en/English - fr/Francais - pl/Polski - de/Deutschland - es/España - pt/Portugal - cs/Česká republika |
| endMessage     | "countdown finish"                                                                  | custom the end message (or empty message)                                                            |
| reactive       | true                                                                                | false (remove seconds and minutes)                                                                   |
| styles         | "font-size:20px;color:#FFF;background-color:#000;padding:10px 5px;font-weight:bold" | remplace my default                                                                                  |
| hideUnit       | ""                                                                                  | 'smhd' : to not display one or multiple unit                                                         |

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

Please, show me your work : **[contact me](https://twitter.com/maxime1jacquet)**
