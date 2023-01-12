import { Component, OnInit } from '@angular/core';
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

  constructor(private projectsService: ProjectsService,
     private activatedRoute: ActivatedRoute,
      private router: Router,
      public imgService: ImageService
       ) { }

  ngOnInit(): void {
    this.imgService.cleanUrl();
    const id = this.activatedRoute.snapshot.params['id'];
    this.projectsService.detail(id).subscribe( data => {
      this.project = data;
  
    }, err =>{
      alert("Error al modificar el proyecto");
      this.router.navigate(['']);
    });
    
  }

  onUpdate(): void{

    Swal.fire({
      title: 'Editando Proyecto',
      text: 'Espere...',
      showConfirmButton: false,
    })

    const id = this.activatedRoute.snapshot.params['id'];
    
    if (this.imgService.url){

      this.project.img = this.imgService.url
    }

    this.projectsService.update( id, this.project ).subscribe( data => {
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
