import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../../services/token.service';
import { Project } from 'src/app/model/project';
import Swal from 'sweetalert2';



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
  faPlus=faPlus

  projects: Project[] = [];
  isAdmin = false

  constructor( private projectsService : ProjectsService, private tokenService: TokenService ) {}
      
  isLogged = false;
  
  ngOnInit(): void {
    this.loadProjects();
    if(this.tokenService.getToken()){
      this.isLogged = true
      if ( JSON.parse(sessionStorage.getItem('AuthAuthorities'))[1] ){

        this.isAdmin = true
       }
    }else{
      this.isLogged = false
    }
  }

  loadProjects():void{
    this.projectsService.lista().subscribe(
      data => { this.projects = data }
    )
  }

  delete(id?: number){
    if(id != undefined){


      Swal.fire({
        title: 'Estas seguro?',
        text: "Mo podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,Borrar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire({
            
            title: 'Borrando proyecto',
            text: 'Espere...',
            showConfirmButton: false
          })
          this.projectsService.delete(id).subscribe( data => {
            Swal.fire({
              icon: 'success',
              title: 'Proyecto Borrado',
              timer: 1500,
              showConfirmButton: false
            })
            this.loadProjects();
          }, err => {
            Swal.fire({

              icon: 'error',
              title: 'no se pudo borrar el proyecto',
              showConfirmButton: false,
              timer: 2500
            })
          });

        }
      })
     

    }
  }


}

