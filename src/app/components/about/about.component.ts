import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';

import { faShop, faIdCard, faPager, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { PersonaService } from '../../services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { AboutService } from '../../services/about.service';
import { About } from 'src/app/model/about';

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
  about: About = null;
  
  constructor( public personaService: PersonaService,
    private tokenService: TokenService,
    private aboutService :AboutService
    ) { }

  isLogged = false
 
  ngOnInit(): void {
    this.loadPersona();
    this.loadAbout();
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
  loadAbout(){
    this.aboutService.detail(1).subscribe( data => {
      this.about = data
    })
  }
  
 
}
