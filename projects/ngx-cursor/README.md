# Angular Cursor (ngx-cursor)

A simple way to change cursor in Angular 7-8-9

# Getting Started

## Links

- [demo](https://ngx-simple.maximejacquet.fr/cursor)
- [my twitter](https://twitter.com/maxime1jacquet)

## Install

```
npm i ngx-cursor
```

## Import "NgxCursorModule" in your angular module (or feature module).

##### app.module.ts

```ts
import { NgxCursorModule } from 'ngx-cursor';

@NgModule({
  imports: [...NgxCursorModule]
})
export class AppModule {}
```

## Add <ngx-cursor></ngx-cursor> in your root component (or in specific component).

```html
<section class="main">
  <router-outlet></router-outlet>
  <ngx-cursor></ngx-cursor>
</section>
```

- Here you add a cusor below the native cursor if you want to **remove default cursor** do :

```html
<ngx-cursor [cursor]="false"></ngx-cursor>
```

- Also you can change the **color** the **size** and **z-index** of custom cursor

```html
<ngx-cursor color="#00FF00" size="10px" [zindex]="9999"></ngx-cursor>
```

- If you want to change the cursor
  during the user's navigation :

```html
<!-- hover active -->
<a href="..." cursor-active></a>

<!-- hover change color -->
<a href="..." cursor-color="red"></a>
<a href="..." cursor-color="transparent"></a>
<a href="..." cursor-color="#00FF00"></a>

<!-- hover opacity -->
<a href="..." cursor-opacity="1"></a>
```

- You can also add a **small text** : use selectors to create a selector with prefix : "cursor-" to display the words with the same indice

```html
<ngx-cursor
  [selectors]="['more', 'prev', 'next']"
  [words]="['see more', '< prev', 'next >']"
></ngx-cursor>

<a href="..." cursor-more>...</a>
<a href="..." cursor-prev>...</a>
<a href="..." cursor-next>...</a>
```

## Docs parameters component

| Parameters name | Default value | Functionality                                        |
| --------------- | ------------- | ---------------------------------------------------- |
| cursor          | true          | display default cursor or not                        |
| color           | #000          | change default cursor bg color                       |
| border          | none          | add border in cursor                                 |
| size            | 30px          | change default cursor size                           |
| opacity         | 0.4           | change default cursor opacity                        |
| delay           | 50            | change delay of mousemouve                           |
| zindex          | 999           | change default cursor z-index                        |
| selectors       | []            | set a list of custom selectors to display small text |
| words           | []            | display words if user hover the selector with indice |
| chekNParents    | 3             | check if n parent have curstom attribute             |

## Docs custom attribute

| Attribute name | Functionality                   |
| -------------- | ------------------------------- |
| cursor-active  | add cusor with active mode      |
| cursor-color   | change cursor color in hover    |
| cursor-opacity | change cursor opacity in hover  |
| cursor-size    | change cursor size in hover     |
| cursor-border  | change cursor border in hover   |
| cursor-?       | display a custom words in hover |

# And that's it, Enjoy !
