import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/model/skill';
import { SkillService } from '../../services/skill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill: Skill = null;
  saveImage: boolean = false;
  form:FormGroup;

  constructor( private skillService: SkillService,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     public imgService: ImageService,
     private formBuilder: FormBuilder 
     ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.imgService.cleanUrl();
    this.skillService.detail( id ).subscribe( data => {
      this.skill = data;
      this.form = this.formBuilder.group({
        nombre:[data.nombre,[Validators.required]],
        img:[data.img,[Validators.required]],
        porcentaje:[data.porcentaje,[Validators.required]]

      })
    }, err =>{
      Swal.fire({
        title: 'error al modificar skill',
        icon:'error',
        showConfirmButton: false,
      })
      this.router.navigate(['']);
    });
  }

  get Nombre(){
    return this.form.get('nombre')
  }
  get Img(){
    return this.form.get('img')
  }
  get Porcentaje(){
    return this.form.get('porcentaje')
  }


  onUpdate(event: Event){
    event.preventDefault()

    if(this.form.value.nombre && this.form.value.img && this.form.value.porcentaje){

      Swal.fire({
        title: 'Editando Skill',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
  
      const id = this.activatedRoute.snapshot.params['id'];
  
  
      if (this.imgService.url){
  
        this.form.value.img = this.imgService.url
      }
  
  
  
      this.skillService.update(id, this.form.value).subscribe( data => {
  
        Swal.fire({
          icon: 'success',
          title: 'Skill Editado',
          timer: 1500,
          showConfirmButton: false
        })
        this.router.navigate(['']);
  
      }, err =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al modificar skill',
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

  uploadImage($event : any){
    this.saveImage = true
    const id = this.activatedRoute.snapshot.params['id'];
   
    const name = "project_" + id
    this.imgService.uploadImage( $event, name ).then(r =>{

      this.saveImage = false
    });
  }
}
