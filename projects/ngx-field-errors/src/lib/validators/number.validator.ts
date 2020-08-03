import { AbstractControl } from '@angular/forms';

export function ngxFieldNumber(c: AbstractControl) {
  const test = c.value === '' || c.value === null || /[0-9]/.test(c.value);
  return test && c.value?.length > 0 ? null : { hasNumber: true };
}
