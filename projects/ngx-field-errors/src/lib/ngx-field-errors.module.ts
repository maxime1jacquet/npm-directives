import { NgModule } from '@angular/core';
import { NgxFieldErrorDirective } from './ngx-field-error.directive';
import { MarkFormTouchedDirective } from './mark-all-as-touched.directive';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [NgxFieldErrorDirective, MarkFormTouchedDirective],
  imports: [],
  exports: [NgxFieldErrorDirective, MarkFormTouchedDirective]
})
export class NgxFieldErrorsModule {
  static forRoot(config = {}, lang = 'en'): ModuleWithProviders {
    return {
      ngModule: NgxFieldErrorsModule,
      providers: [
        {
          provide: 'CustomErrorMessage',
          useValue: config
        },
        {
          provide: 'CustomLanguage',
          useValue: lang
        }
      ]
    };
  }
}
