import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ImageService } from 'src/app/services/image.service';
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

  constructor( private projectsService: ProjectsService,
    private activatedRouter: ActivatedRoute,
     private router: Router,
     public imgService: ImageService
      ) { }

  ngOnInit(): void {
  }

  onCreate(): void{

    const project = new Project(this.title, this.descripcion, this.img, this.giturl, this.weburl);

    project.img = this.imgService.url

    
    this.projectsService.save( project ).subscribe( data =>{
      alert("projecto añadido");
      this.imgService.cleanUrl();
      this.router.navigate(['']);
    }, err =>{
      alert("fallo");
      this.router.navigate(['']);
    });
  }

  uploadImage($event: any){
   
    const name = "project_" 
    this.imgService.uploadImage( $event, name  );
  }
}
