import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ngx-simple',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AppComponent {
  title = 'NgxSimpleCountdownDirective';
}
