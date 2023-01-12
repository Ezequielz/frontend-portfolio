import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

import { LoginUsuario } from 'src/app/model/login-usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  
  constructor( private tokenService: TokenService, private authService: AuthService, private router: Router ) {}

  ngOnInit(): void {
    if( this.tokenService.getToken() ){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }


  onLogin() : void{
    Swal.fire({
            
      title: 'Iniciando sesión',
      text: 'Espere...',
      showConfirmButton: false
    })
    this.loginUsuario = new LoginUsuario( this.nombreUsuario, this.password); 
      this.authService.login( this.loginUsuario ).subscribe(data =>{
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenService.setToken( data.token );
        this.tokenService.setUserName( data.nombreUsuario );
        this.tokenService.setAuthorities( data.authorities );
        this.roles = data.authorities;
        Swal.fire({
          showConfirmButton: false,
          timer: 10
        })
        this.router.navigate([''])
      }, err =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesion',
          text: 'Usuario y/o contraseña incorrectos',
          showConfirmButton: false,
          timer: 2500
        })
        this.nombreUsuario = '';
        this.password = '';
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.mensaje;
        // console.log(this.errMsj);
      }
    )
  }


}
