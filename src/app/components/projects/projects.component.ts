import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Iprojects {
  id: string
  title: string
  info: string
  imagen: string
  url: string
  github: string
  tecnologias: string
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  faGithub=faGithub
  faGlobe=faGlobe
  faPenToSquare=faPenToSquare
  faTrashCan=faTrashCan


  constructor( public projectsService : ProjectsService ) {
console.log(projectsService)
    
      }
      
  
  ngOnInit(): void {
  }


}
