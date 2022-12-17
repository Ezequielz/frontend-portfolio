import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ImageService } from 'src/app/services/image.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  
  project : Project = null;

  constructor(private projectsService: ProjectsService,
     private activatedRouter: ActivatedRoute,
      private router: Router,
      public imgService: ImageService
       ) { }

  ngOnInit(): void {
    this.imgService.cleanUrl();
    const id = this.activatedRouter.snapshot.params['id'];
    this.projectsService.detail(id).subscribe( data => {
      this.project = data;
  
    }, err =>{
      alert("Error al modificar el proyecto");
      this.router.navigate(['']);
    });
    
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    
    this.project.img = this.imgService.url

    this.projectsService.update( id, this.project ).subscribe( data => {
      this.router.navigate(['']);
    },err =>{
      alert("Error al modificar el proyecto");
      this.router.navigate(['']);
    });
  }

  uploadImage($event: any){
    const id = this.activatedRouter.snapshot.params['id'];
    console.log(id)
    const name = "project_" + id
    this.imgService.uploadImage( $event, name );
  }
}
