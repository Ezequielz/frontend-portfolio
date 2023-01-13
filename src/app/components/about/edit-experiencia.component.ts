import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from '../../model/experiencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {

  experiencia : Experiencia = null;
  form:FormGroup;

  constructor(private experienciaService: ExperienciaService ,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];

    this.experienciaService.detail(id).subscribe( data => {
      this.experiencia = data;
      this.form = this.formBuilder.group({
        fecha:[data.fecha,[Validators.required]],
        title:[data.title,[Validators.required]],
        info:[data.info,[Validators.required]],

      })
    }, err =>{
      Swal.fire({
        title: 'error al modificar experiencia',
        icon:'error',
        showConfirmButton: false,
      })
      this.router.navigate(['']);
    });
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

  onUpdate(event: Event){
    event.preventDefault()
    if(this.form.value.fecha && this.form.value.title && this.form.value.info){
      Swal.fire({
        title: 'Editando Experiencia',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
      const id = this.activatedRouter.snapshot.params['id'];
  
      this.experienciaService.update( id, this.form.value ).subscribe( data => {
  
        Swal.fire({
          icon: 'success',
          title: 'Experiencia Editada',
          timer: 1500,
          showConfirmButton: false
        })
        
        this.router.navigate(['']);
      },err =>{
        
        Swal.fire({
          icon: 'error',
          title: 'Error al modificar la experiencia',
          timer: 1500,
          showConfirmButton: false
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
