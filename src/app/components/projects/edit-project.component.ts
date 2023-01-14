import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  
  project : Project = null;
  saveImage: boolean = false;
  form:FormGroup;

  constructor(private projectsService: ProjectsService,
     private activatedRoute: ActivatedRoute,
      private router: Router,
      public imgService: ImageService,
      private formBuilder: FormBuilder 
       ) { }

  ngOnInit(): void {
    this.imgService.cleanUrl();
    const id = this.activatedRoute.snapshot.params['id'];
    this.projectsService.detail(id).subscribe( data => {
      this.project = data;
      this.form = this.formBuilder.group({
        title:[data.title,[Validators.required]],
        descripcion:[data.descripcion,[Validators.required]],
        img:[data.img,[Validators.required]],
        giturl:[data.giturl,[Validators.required]],
        weburl:[data.weburl,[Validators.required]],

      })
  
    }, err =>{
      Swal.fire({
        title: 'error al modificar proyecto',
        icon:'error',
        showConfirmButton: false,
      })
      this.router.navigate(['']);
    });
    
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


  onUpdate(event: Event): void{
    event.preventDefault()

    if(this.form.value.title && this.form.value.descripcion && this.form.value.img && this.form.value.giturl && this.form.value.weburl){

      Swal.fire({
        title: 'Editando Proyecto',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
      const id = this.activatedRoute.snapshot.params['id'];
      
      if (this.imgService.url){
  
        this.form.value.img = this.imgService.url
      }
  
      this.projectsService.update( id, this.form.value ).subscribe( data => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto Editado',
          timer: 1500,
          showConfirmButton: false
        })
        this.router.navigate(['']);
      },err =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al modificar proyecto',
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

  uploadImage($event: any){
    this.saveImage = true
    const id = this.activatedRoute.snapshot.params['id'];
   
    const name = "project_" + id
    this.imgService.uploadImage( $event, name ).then(r =>{

      this.saveImage = false
    });
  }
}
