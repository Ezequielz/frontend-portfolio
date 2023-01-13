import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formacion } from 'src/app/model/formacion';
import { FormacionService } from 'src/app/services/formacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-formacion',
  templateUrl: './edit-formacion.component.html',
  styleUrls: ['./edit-formacion.component.css']
})
export class EditFormacionComponent implements OnInit {

  formacion: Formacion = null;
  form:FormGroup;

  constructor(private formacionService: FormacionService ,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder ) {   }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];

    this.formacionService.detail(id).subscribe( data => {
      this.formacion = data;
      this.form = this.formBuilder.group({
        fecha:[data.fecha,[Validators.required]],
        title:[data.title,[Validators.required]],
        subtitle:[data.subtitle,[Validators.required]],
        info:[data.info,[Validators.required]],

      })
    }, err =>{
      Swal.fire({
        title: 'error al modificar formacion',
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
  get Subtitle(){
    return this.form.get('subtitle')
  }
  get Info(){
    return this.form.get('info')
  }

  onUpdate(event: Event): void{
    event.preventDefault()

    if(this.form.value.fecha && this.form.value.title && this.form.value.subtitle && this.form.value.info){

      Swal.fire({
        title: 'Editando Formacion',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
      const id = this.activatedRouter.snapshot.params['id'];
  
  
      this.formacionService.update( id, this.form.value ).subscribe( data => {
  
        Swal.fire({
          icon: 'success',
          title: 'Formacion Editada',
          timer: 1500,
          showConfirmButton: false
        })
        
        this.router.navigate(['']);
      },err =>{
  
        Swal.fire({
          icon: 'error',
          title: 'Error al modificar la formacion',
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
