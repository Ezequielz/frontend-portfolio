import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  
  project : Project = null;

  constructor(private projectsService: ProjectsService, private activatedRouter: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
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

    this.projectsService.update( id, this.project ).subscribe( data => {
      this.router.navigate(['']);
    },err =>{
      alert("Error al modificar el proyecto");
      this.router.navigate(['']);
    });
  }
}
