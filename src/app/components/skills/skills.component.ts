import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrashCan ,faPlus} from '@fortawesome/free-solid-svg-icons';
import { Skill } from 'src/app/model/skill';
import Swal from 'sweetalert2';
import { SkillService } from '../../services/skill.service';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  faPenToSquare=faPenToSquare
  faTrashCan=faTrashCan
  faPlus=faPlus

  skill: Skill[] = [];


  constructor( private skillService: SkillService, private tokenService: TokenService ) { }

  isLogged = false;
  isAdmin = false

  ngOnInit(): void {
    this.loadSkills();

    if(this.tokenService.getToken()){
      this.isLogged = true

      if ( JSON.parse(sessionStorage.getItem('AuthAuthorities'))[1] ){

        this.isAdmin = true
       }
    }else{
      this.isLogged = false
    }
  }

  loadSkills(): void{
    this.skillService.lista().subscribe( data => {
      this.skill = data;
    });
  }

  delete( id: number ) {
    if( id != undefined ){

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
            
            title: 'Borrando skill',
            text: 'Espere...',
            showConfirmButton: false
          })
          this.skillService.delete(id).subscribe( data => {
            Swal.fire({
              icon: 'success',
              title: 'Skill Borrado',
              timer: 1500,
              showConfirmButton: false
            })
            this.loadSkills();
          }, err => {
            Swal.fire({

              icon: 'error',
              title: 'no se pudo borrar la Skill',
              showConfirmButton: false,
              timer: 2500
            })
          });

        }
      })

    }
  }
}
