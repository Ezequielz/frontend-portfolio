import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';

import { faShop, faIdCard, faPager, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { PersonaService } from '../../services/persona.service';

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

  persona: persona = new persona("","","","","","","");
  
  constructor( public personaService: PersonaService ) { 
    
  }
 
  ngOnInit(): void {
    this.personaService.getPersona().subscribe( data => { 
      this.persona = data
      
    })
    
  }
  
 
}
