import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RespuestaGenerica } from 'src/app/core/interface/respuesta-generica';
import { LoginService } from './login.service';
import { Usuario } from 'src/app/core/interface/user.interface';

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

  get usuarioField() {
    return this.loginForm.get('usuario');
  }
  get contrasenaField() {
    return this.loginForm.get('contrasena');
  }

  constructor(
    // private toastr: ToastrService,
    // private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private rout: Router,
    private _seguridad: LoginService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getUsuario();
  }

  // /** Obtiene el usuario loggueado en Siinco */
  getUsuario() {
    // this.spinner.show();
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
  }

  clearLoginForm() {
    this.loginForm.controls['usuario'].setValue('');
    this.loginForm.controls['contrasena'].setValue('');
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const usuario = new Usuario();
    let user = this.loginForm.controls['usuario'].value;
    let pass = this.loginForm.controls['contrasena'].value;
    usuario.USUARIO = user.toString().toUpperCase(); // Usa get() para obtener el valor del FormControl
    usuario.CLAVE = pass.toString();

    // this.spinner.show(); // Descomenta si estás utilizando algún spinner
    this._seguridad.login(usuario).subscribe(
      (data) => {
        if (data.EstadoProceso) {
          // this.toastr.success("Bienvenido " + data.Data.Name);
          this.rout.navigate(['/reporte-express']);
        } else {
          this.mensajeFlag = true;
          this.mensaje = data.Mensaje;
          // this.toastr.info(data.Mensaje);
        }
        this._seguridad.setData(data);
        // Coloca aquí la lógica que se ejecutaba en finalize
      },
      (err) => {
        this.mensajeFlag = true;
        this.mensaje = err
        // Handle errors
        // this._seguridad.setData(null, true);
        // this.toastr.error(err);
        // Coloca aquí la lógica que se ejecutaba en finalize para los errores
      }
    );
  }
}
