import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RespuestaGenerica } from 'src/app/core/interface/respuesta-generica';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  resultado?: RespuestaGenerica ;

  get usuarioField() {
    return this.loginForm.get("usuario");
  }
  get contrasenaField() {
    return this.loginForm.get("contrasena");
  }

  constructor(
    // private toastr: ToastrService,
    // private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private rout: Router,
    private _seguridad: LoginService
  ) {
    this.loginForm = this.fb.group({
      usuario: ["", [Validators.required]],
      contrasena: ["",[Validators.required]],
    });
  }

  ngOnInit() {
    // this.getUsuario();
  }

  // /** Obtiene el usuario loggueado en Siinco */
  // getUsuario() {
  //   // this.spinner.show();
  //   this._seguridad
  //     .lastUser()
  //     .pipe(
  //       finalize(() => {
  //         this.spinner.hide();
  //       })
  //     )
  //     .subscribe(
  //       (data) => {
  //         if (data) {
  //           this.loginForm.patchValue({
  //             usuario: data,
  //           });
  //         }
  //       },
  //       (err) => {}
  //     );
  // }

  // /** limpia el formulario loginForm **/
  // clearLoginForm() {
  //   this.usuarioField.setValue("");
  //   this.contrasenaField.setValue("");
  // }

  /** Inicia sesión **/
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    // const usuario = new Usuario();
    // usuario.USUARIO = this.usuarioField.value.toUpperCase();
    // usuario.CLAVE = this.contrasenaField.value;
    // this.spinner.show();
    // this._seguridad
    //   .login(usuario)
    //   .pipe(
    //     finalize(() => {
    //       this.spinner.hide();
    //     })
    //   )
    //   .subscribe(
    //     (data) => {
    //       if (data.EstadoProceso) {
    //         this.toastr.success("Bienvenido " + data.Data.Name);
    //         this.rout.navigate(["/maintenance"]);
    //       } else {
    //         this.toastr.info(data.Mensaje);
    //       }
    //       this._seguridad.setData(data);
    //     },
    //     (err) => {
    //       this._seguridad.setData(null, true);
    //       this.toastr.error(err);
    //     }
    //   );
  }
}
