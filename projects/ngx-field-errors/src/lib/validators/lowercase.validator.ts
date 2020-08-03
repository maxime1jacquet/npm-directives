import { AbstractControl } from '@angular/forms';

export function ngxFieldLowercase(c: AbstractControl) {
  const test = c.value === '' || c.value === null || /[a-z]/.test(c.value);
  return test && c.value?.length > 0 ? null : { hasLowercase: true };
}
