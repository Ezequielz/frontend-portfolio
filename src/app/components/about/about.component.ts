import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';

import { faShop, faIdCard, faPager, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { PersonaService } from '../../services/persona.service';
import { TokenService } from 'src/app/services/token.service';

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

  persona: Persona = null;
  
  constructor( public personaService: PersonaService,private tokenService: TokenService ) { }

  isLogged = false
 
  ngOnInit(): void {
    this.loadPersona();

    if(this.tokenService.getToken()){
      this.isLogged = true
    }else{
      this.isLogged = false
    }

  }

  loadPersona(){
    this.personaService.detail(1).subscribe( data => {
      this.persona = data
    })
  }
  
 
}
