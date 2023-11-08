import { ValidationErrors, AbstractControl } from '@angular/forms';

/**
 * Retorna {emailInvalido: true} si un correo no tiene
 * una estructura valida
 * @param control: AbstractControl, controlador del formulario
 * @author fespana
 * @returns ValidationErrors | null
 */
export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailRegExp = RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})+(?:\.[a-zA-Z]{2})*$/
  );

  if (control.value && !emailRegExp.test(control.value)) {
    return { emailInvalido: true };
  }
  return null;
}

export function no_white_spaces(
  control: AbstractControl
): ValidationErrors | null {
  const inputRegExp = RegExp(/^(?! ).*[^ ]$/);

  if (control.value && !inputRegExp.test(control.value)) {
    return { inputInvalido: true };
  }
  return null;
}
