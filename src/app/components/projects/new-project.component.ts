import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
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

  constructor( private projectsService: ProjectsService, private router: Router ) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const project = new Project(this.title, this.descripcion, this.img, this.giturl, this.weburl);
    this.projectsService.save( project ).subscribe( data =>{
      alert("projecto añadido");
      this.router.navigate(['']);
    }, err =>{
      alert("fallo");
      this.router.navigate(['']);
    });
  }
}
