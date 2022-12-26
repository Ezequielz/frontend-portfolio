import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  persona: Persona = null;

  constructor(public personaService: PersonaService) { }

  ngOnInit(): void {
    
    this.loadPersona();
  }

  loadPersona(){
    this.personaService.detail(1).subscribe( data => {
      this.persona = data
    })
  }

  toHeader(){
    document.getElementById('header').scrollIntoView()
  }
  toAbout(){
    document.getElementById('about').scrollIntoView()
  }
  toProject(){
    document.getElementById('project').scrollIntoView()
  }
  toSkill(){
    document.getElementById('skills').scrollIntoView()
  }
  toContact(){
    document.getElementById('contacto').scrollIntoView()
  }

}
