import { NgModule } from '@angular/core';
import { ControlErrorsDirective } from './form-errors-check.directive';
import { MarkFormTouchedDirective } from './mark-all-as-touched.directive';

@NgModule({
  declarations: [ControlErrorsDirective, MarkFormTouchedDirective],
  imports: [],
  exports: [ControlErrorsDirective, MarkFormTouchedDirective]
})
export class NgxFieldErrorsModule {}
