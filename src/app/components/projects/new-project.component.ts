import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  title: string = '';
  descripcion: string = '';
  img: string = '';
  giturl: string = '';
  weburl: string = '';
  saveImage: boolean = false;
  form:FormGroup;

  constructor( private projectsService: ProjectsService,
    private activatedRouter: ActivatedRoute,
     private router: Router,
     public imgService: ImageService,
     private formBuilder: FormBuilder
      ) { 

        this.form = this.formBuilder.group({
          title:['',[Validators.required]],
          descripcion:['',[Validators.required]],
          img:['',[Validators.required]],
          giturl:['',[Validators.required]],
          weburl:['',[Validators.required]],
  
        })
      }

  ngOnInit(): void {
  }

  get Title(){
    return this.form.get('title')
  }
  get Descripcion(){
    return this.form.get('descripcion')
  }
  get Img(){
    return this.form.get('img')
  }
  get Giturl(){
    return this.form.get('giturl')
  }
  get Weburl(){
    return this.form.get('weburl')
  }

  onCreate(event: Event): void{
    event.preventDefault()
    // const project = new Project(this.title, this.descripcion, this.img, this.giturl, this.weburl);
    if(this.form.value.title && this.form.value.descripcion && this.form.value.img && this.form.value.giturl && this.form.value.weburl){

      Swal.fire({
        title: 'Creando Proyecto',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
      this.form.value.img = this.imgService.url
  
      
      this.projectsService.save( this.form.value ).subscribe( data =>{
        
        Swal.fire({
          title: 'Proyecto creado correctamente',
          text: "Quieres agregar otro?",
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
          title: 'error al agregar proyecto',
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

  uploadImage($event: any){
    this.saveImage = true
    const name = "project_" 
    this.imgService.uploadImage( $event, name  ).then(r =>{

      this.saveImage = false
    });
  }
}
