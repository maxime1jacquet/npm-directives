import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function ngxFieldMinCheckbox(n: number = 0): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const test = c.value?.filter((item) => item)?.length > n;
    return test ? null : { minCheckbox: true };
  };
}
