import { AbstractControl } from '@angular/forms';

/**
 * Custom Form Validator for SIRET (14 digits)
 *
 */
export function ngxFieldSiret(c: AbstractControl) {
  const test =
    c.value === '' || c.value === null || /^[0-9]{14}$/.test(c.value);
  return !test ? { siret: true } : null;
}
