import { Component, OnInit } from '@angular/core';
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

  constructor( private projectsService: ProjectsService,
    private activatedRouter: ActivatedRoute,
     private router: Router,
     public imgService: ImageService
      ) { }

  ngOnInit(): void {
  }

  onCreate(): void{

    const project = new Project(this.title, this.descripcion, this.img, this.giturl, this.weburl);

    Swal.fire({
      title: 'Creando Proyecto',
      text: 'Espere...',
      showConfirmButton: false,
    })

    project.img = this.imgService.url

    
    this.projectsService.save( project ).subscribe( data =>{
      
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
  }

  uploadImage($event: any){
    this.saveImage = true
    const name = "project_" 
    this.imgService.uploadImage( $event, name  ).then(r =>{

      this.saveImage = false
    });
  }
}
