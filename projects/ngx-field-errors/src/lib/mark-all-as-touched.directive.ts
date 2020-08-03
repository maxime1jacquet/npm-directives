import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[markAllAsTouched]'
})
export class MarkFormTouchedDirective {
  @Input() formGroup: FormGroup;

  @HostListener('submit')
  onSubmit() {
    this.formGroup.markAllAsTouched();
  }
}
