import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {
  fecha: string;
  title: string;
  info: string;
  form:FormGroup;

  constructor(private experienciaService: ExperienciaService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        fecha:['',[Validators.required]],
        title:['',[Validators.required]],
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
  get Info(){
    return this.form.get('info')
  }


  onCreate(event: Event){
    event.preventDefault()
    // const experiencia = new Experiencia( this.fecha, this.title,this.info );
    if(this.form.value.fecha && this.form.value.title && this.form.value.info){

      Swal.fire({
        title: 'Creando Experiencia',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
    
      this.experienciaService.save( this.form.value ).subscribe( data => {
        
        Swal.fire({
          title: 'Experiencia creada correctamente',
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
          title: 'error al agregar experiencia',
          showConfirmButton: false,
          timer: 2500
        })
        
        this.router.navigate(['']);
      });
    }else{
      Swal.fire({
        title: 'Debe completar todos los campos',
        icon:'error',
        timer:1500,
        showConfirmButton: false,
      })
    }
  }

}
