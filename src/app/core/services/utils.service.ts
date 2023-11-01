import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TRANSLATE_CALENDAR } from '../constant/constantes';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private _configPrimeNG: PrimeNGConfig) {}

  stepcomplete(id: number, nombreElemento: string) {
    const collection = document.getElementById(nombreElemento)!.children;
    collection[0].classList.add('p-steps-completed-' + id);
    collection[0].children[0].children[
      id - 1
    ].children[0].children[0].innerHTML =
      '<i class="fa fa-check-circle">&#x2713;</i>';
  }

  previousstep(id: number, nombreElemento: string) {
    const collection = document.getElementById(nombreElemento)!.children;
    collection[0].classList.remove('p-steps-completed-' + id);
    collection[0].children[0].children[
      id - 2
    ].children[0].children[0].innerHTML = (id - 1).toString();
  }

  fnCambiarIdiomaCalendario(): void {
    this._configPrimeNG.setTranslation({
      ...TRANSLATE_CALENDAR,
    });
  }
}
