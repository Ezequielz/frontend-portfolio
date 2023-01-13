import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formacion } from 'src/app/model/formacion';
import { FormacionService } from '../../services/formacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-formacion',
  templateUrl: './new-formacion.component.html',
  styleUrls: ['./new-formacion.component.css']
})
export class NewFormacionComponent implements OnInit {
  fecha: string;
  title: string;
  subtitle: string;
  info: string;

  form:FormGroup;

  constructor(private formacionService: FormacionService,
    private router: Router,
    private formBuilder: FormBuilder ) { 
      this.form = this.formBuilder.group({
        fecha:['',[Validators.required]],
        title:['',[Validators.required]],
        subtitle:['',[Validators.required]],
        info:['',[Validators.required]],

      })
    }

  ngOnInit(): void {
  }

  get Fecha(){
    return this.form.get('fecha')
  }
  get Title(){
    return this.form.get('title')
  }
  get Subtitle(){
    return this.form.get('subtitle')
  }
  get Info(){
    return this.form.get('info')
  }

  onCreate(event: Event){
    event.preventDefault()
    // const formacion = new Formacion( this.fecha, this.title, this.subtitle,this.info );
   
    if(this.form.value.fecha && this.form.value.title && this.form.value.subtitle && this.form.value.info){
      Swal.fire({
        title: 'Creando Formacion',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
  
    
      this.formacionService.save( this.form.value ).subscribe( data => {
  
  
        Swal.fire({
          title: 'Formacion creada correctamente',
          text: "Quieres agregar otra?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Agregar'
        }).then((result) => {
          if (!result.isConfirmed) {
            this.router.navigate(['']);
          }
        })
  
  
     
      }, err =>{
  
        Swal.fire({
     
          icon: 'error',
          title: 'error al agregar formacion',
          showConfirmButton: false,
          timer: 2500
        })
  
        this.router.navigate(['']);
      });

    } else{

      Swal.fire({
        title: 'Debe completar todos los campos',
        icon:'error',
        timer:1500,
        showConfirmButton: false,
      })
    }



  }

}
