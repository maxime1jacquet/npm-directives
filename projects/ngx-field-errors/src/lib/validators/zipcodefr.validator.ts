import { AbstractControl } from '@angular/forms';

export function ngxFieldZipcodeFR(c: AbstractControl) {
  const test =
    c.value === '' ||
    c.value === null ||
    /(^[0-8]\d\d{3}$)|(^9[0-5]\d{3}$)|(^97[1-6]\d{2}$)|(^98[46-8]\d{2}$)/.test(
      c.value
    );
  return !test ? { zipcodeFr: true } : null;
}
