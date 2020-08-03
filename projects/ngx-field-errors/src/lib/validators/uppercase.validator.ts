import { AbstractControl } from '@angular/forms';

export function ngxFieldUppercase(c: AbstractControl) {
  const test = c.value === '' || c.value === null || /[A-Z]/.test(c.value);
  return test && c.value?.length > 0 ? null : { hasUppercase: true };
}
