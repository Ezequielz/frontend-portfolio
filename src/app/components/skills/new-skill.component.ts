import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { SkillService } from '../../services/skill.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {
  nombre: string;
  porcentaje: number;
  img: string;
  saveImage: boolean = false;
  form:FormGroup;

  constructor( private skillService: SkillService,
     private router: Router,
     public imgService: ImageService,
     private formBuilder: FormBuilder
     ) {
      this.form = this.formBuilder.group({
        nombre:['',[Validators.required]],
        porcentaje:['',[Validators.required]],
        img:['',[Validators.required]]

      })
      }

  ngOnInit(): void {
  }

  get Nombre(){
    return this.form.get('nombre')
  }
  get Porcentaje(){
    return this.form.get('porcentaje')
  }
  get Img(){
    return this.form.get('img')
  }


  onCreate(event: Event){
    event.preventDefault()
    // const skill = new Skill( this.nombre, this.porcentaje, this.img );

    if(this.form.value.nombre && this.form.value.porcentaje && this.form.value.img){

      Swal.fire({
        title: 'Creando Skill',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
  
      this.form.value.img = this.imgService.url
  

      this.skillService.save( this.form.value ).subscribe( data => {
     
        Swal.fire({
          title: 'Skill creada correctamente',
          text: "Quieres agregar otra?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Agregar'
        }).then((result) => {
          this.imgService.cleanUrl();
          if (!result.isConfirmed) {
            this.router.navigate(['']);
          }
        })
  
      
  
      }, err =>{
        Swal.fire({
     
          icon: 'error',
          title: 'error al agregar skill',
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

  uploadImage($event : any){
    this.saveImage = true
    const name = "skill_" 
    this.imgService.uploadImage( $event, name  ).then(r =>{

      this.saveImage = false
    });
  }

}
