import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RespuestaGenerica } from 'src/app/core/interface/respuesta-generica';
import { LoginService } from './login.service';
import { Usuario } from 'src/app/core/interface/user.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';
/**
 * Componente de Login 
 * @author fespana
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resultado?: RespuestaGenerica;
  usuario?: Usuario;
  mensajeFlag: boolean = false;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private rout: Router,
    private _seguridad: LoginService,
    private ngxService: NgxUiLoaderService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  /**
   * Método de inicio del componente.
   * Inicializa el componente y realiza alguna acción al inicio.
   */
  ngOnInit() {
    // this.getUsuario();
  }

  /**
   * Obtener el usuario logueado en Siinco.
   * Realiza una solicitud para obtener información del usuario logueado.
   */
  async getUsuario() {
    this.ngxService.start();
    this._seguridad.lastUser().subscribe(
      (data) => {
        if (data) {
          this.loginForm.patchValue({
            usuario: data,
          });
        }
      },
      (err) => {}
    );
    this.ngxService.stop();
  }

  /**
   * Limpiar el formulario de inicio de sesión.
   * Restablece los campos del formulario a sus valores iniciales.
   */
  clearLoginForm() {
    this.loginForm.controls['usuario'].setValue('');
    this.loginForm.controls['contrasena'].setValue('');
  }

  /**
   * Realizar el proceso de inicio de sesión.
   * Valida el formulario y realiza la acción de inicio de sesión.
   */
  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.ngxService.start();
    const usuario = new Usuario();
    let user = this.loginForm.controls['usuario'].value;
    let pass = this.loginForm.controls['contrasena'].value;
    usuario.USUARIO = user.toString().toUpperCase();
    usuario.CLAVE = pass.toString();
    let data = await this._seguridad.login(usuario);
    try {
      if (data.EstadoProceso) {
        this.rout.navigate(['/reporte-express']);
      } else {
        this.mensajeFlag = true;
        this.mensaje = data.Mensaje;
      }

      this._seguridad.setData(data);
    } catch (error) {
      this.mensajeFlag = true;
      this.mensaje = 'Error';
      this._seguridad.setData(data, true);
    }
    this.ngxService.stop();
  }
}
