import { NgModule } from "@angular/core";
import { NgxSimpleCountdownDirective } from "./ngx-simple-countdown.directive";
import { NgxSimpleTimeagoDirective } from "./ngx-simple-timeago.directive";

@NgModule({
  declarations: [NgxSimpleCountdownDirective, NgxSimpleTimeagoDirective],
  imports: [],
  exports: [NgxSimpleCountdownDirective, NgxSimpleTimeagoDirective]
})
export class NgxSimpleCountdownModule {}
