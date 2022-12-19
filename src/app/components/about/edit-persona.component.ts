import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {

  persona: Persona = null;
 

  constructor(private personaService: PersonaService ,
    private activatedRouter: ActivatedRoute,
    private router: Router  ,
    public imgService: ImageService
    ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.imgService.cleanUrl();
    this.personaService.detail(id).subscribe( data => {
      this.persona = data;
    }, err =>{
      alert("Error al modificar el proyecto");
      this.router.navigate(['']);
    });
    
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    
    this.persona.img = this.imgService.url
   
    this.personaService.update( id, this.persona ).subscribe( data => {
      
      this.router.navigate(['']);
    },err =>{
      
      alert("Error al modificar la persona");
      this.router.navigate(['']);
    });

  }

  uploadImage($event: any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_" + id
    this.imgService.uploadImage( $event, name );
  }
}
