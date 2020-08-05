import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-simple',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'NgxSimpleCountdownDirective';
}
