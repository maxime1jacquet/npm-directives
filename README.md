# Angular Directives by Maxime Jacquet

## 1 - List

- ngx-simple-parallax
- ngx-cursor
- ngx-simple-countdown
- ngx-simple-slider **deprecated**

## 2 - Create new

```
ng generate library my-lib
```

## 3 - Deploy

- nx build [lib] --configuration=production
- update package.json and readme.md
- npm login

```
login : maxime1jacquet (or maximejacquet)
pass : \*
email : \*
mfa : use code by email
```

- cd dist/[lib]
- npm publish (--access=public) for yoozly package
