import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, private auth: AuthService, private route:Router ) {
    this.form = this.formBuilder.group(
      {
        email: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],

      }
    )
   }

  ngOnInit(): void {
  }


  get Email() {
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password')
  }

  onStartLogin( e:Event ){
    e.preventDefault;
    this.auth.login( this.form.value ).subscribe( data => {

      console.log( "DATA: ", JSON.stringify( data ) );

      this.route.navigate(['/portfolio']);
    });
  }

}
