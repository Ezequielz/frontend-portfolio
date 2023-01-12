import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {

  persona: Persona = null;
  saveImage: boolean = false

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

    Swal.fire({
      title: 'Editando Persona',
      text: 'Espere...',
      showConfirmButton: false,
    })


    const id = this.activatedRouter.snapshot.params['id'];
    
    if (this.imgService.url){

      this.persona.img = this.imgService.url
    }
   
    this.personaService.update( id, this.persona ).subscribe( data => {

      Swal.fire({
        icon: 'success',
        title: 'Persona Editada',
        timer: 1500,
        showConfirmButton: false
      })
      
      this.router.navigate(['']);
    },err =>{
      
      Swal.fire({
        icon: 'error',
        title: 'Error al modificar la persona',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['']);
    });

  }

  uploadImage($event: any){

    this.saveImage = true
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_" + id
    this.imgService.uploadImage( $event, name ).then(r =>{

      this.saveImage = false
    });
   
  }
}
