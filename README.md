# Angular Simple Countdown (ngx-simple-countdown)

The most simple way to display a countdown in angular 7

# Getting Started

### Demo

```
https://chti-raidtour.fr/nomadraid
```

### Install

```
npm i ngx-simple-countdown
```

### Import in your angular module

##### app.module.ts

```ts
import { NgxSimpleCountdownModule } from "ngx-simple-countdown";

@NgModule({
  imports: [NgxSimpleCountdownModule]
})
export class AppModule {}
```

### Add "simpleCountdown" in new div in your component

##### app.component.html

```html
<div class="countdown" simpleCountdown [dateTo]="1581242400"></div>

<!-- 
  convert your date to timestamps
  http://www.timestamp.fr/ 
-->
```

### And you can add some parameters

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
></div>

<!-- 
language : default language is en (en / fr)
endMessage : custom the end message (or empty message)
reactive=false : remove seconds and minutes
style : remplace default styles
-->
```

### Add styles in your div

##### app.component.scss

```css
.countdown {
  border: 2px solid red;
  position: absolute;
  top: 0;
  right: 0;
}
```

# And that's it, Enjoy !
