import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrashCan ,faPlus} from '@fortawesome/free-solid-svg-icons';
import { Skill } from 'src/app/model/skill';
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
      this.skillService.delete(id).subscribe( data => {
        this.loadSkills();
      }, err => {
        alert("no se pudo borrar la skill")
      });
    }
  }
}
