import { NgModule } from '@angular/core';
import { NgxFieldErrorDirective } from './form-errors-check.directive';
import { MarkFormTouchedDirective } from './mark-all-as-touched.directive';

@NgModule({
  declarations: [NgxFieldErrorDirective, MarkFormTouchedDirective],
  imports: [],
  exports: [NgxFieldErrorDirective, MarkFormTouchedDirective]
})
export class NgxFieldErrorsModule {}
