import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';

import { faShop, faIdCard, faPager, faPenToSquare, faTrashCan ,faPlus} from '@fortawesome/free-solid-svg-icons';

import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { PersonaService } from '../../services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { AboutService } from '../../services/about.service';
import { About } from 'src/app/model/about';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { FormacionService } from '../../services/formacion.service';
import { Experiencia } from 'src/app/model/experiencia';
import { Formacion } from 'src/app/model/formacion';




@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  faShop=faShop
  faPager=faPager
  faIdCard=faIdCard
  faPenToSquare=faPenToSquare
  faTrashCan=faTrashCan
  faPlus=faPlus

  persona: Persona = null;
  about: About = null;
  
  constructor( public personaService: PersonaService,
    private tokenService: TokenService,
    private aboutService :AboutService,
    private experienciaService :ExperienciaService,
    private formacionService :FormacionService
    ) { }

  isLogged = false
  isAdmin = false
  asd = ''
  experiencia: Experiencia[] = [];
  formacion: Formacion[] = [];

  ngOnInit(): void {
    this.loadPersona();
    this.loadAbout();
    this.loadExp();
    this.loadFormacion();

    if(this.tokenService.getToken()){
      this.isLogged = true

     if ( JSON.parse(sessionStorage.getItem('AuthAuthorities'))[1]){
      
      this.isAdmin = true
     }
     
    }else{
      this.isLogged = false
    }

  }

  loadPersona(){
    this.personaService.detail(1).subscribe( data => {
      this.persona = data
    })
  }
  loadAbout(){
    this.aboutService.detail(1).subscribe( data => {
      this.about = data
    })
  }

  loadExp(): void{
    this.experienciaService.lista().subscribe( data => {
      data.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))
      this.experiencia = data;
    });
  }
  loadFormacion(): void{
    this.formacionService.lista().subscribe( data => {

      data.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))
      this.formacion = data;
    });
  }

  deleteFormacion( id: number ) {
    if( id != undefined ){
      this.formacionService.delete(id).subscribe( data => {
        this.loadFormacion();
      }, err => {
        alert("no se pudo borrar la formacion")
      });
    }
  }
  deleteExperiencia( id: number ) {
    if( id != undefined ){
      this.experienciaService.delete(id).subscribe( data => {
        this.loadExp();
      }, err => {
        alert("no se pudo borrar la experiencia")
      });
    }
  }
  
 
}
