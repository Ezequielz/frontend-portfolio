import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {

  persona: Persona = null;
  saveImage: boolean = false
  form:FormGroup;

  constructor(private personaService: PersonaService ,
    private activatedRouter: ActivatedRoute,
    private router: Router  ,
    public imgService: ImageService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.imgService.cleanUrl();
    this.personaService.detail(id).subscribe( data => {
      this.persona = data;
      this.form = this.formBuilder.group({
        nombre:[data.nombre,[Validators.required]],
        apellido:[data.apellido,[Validators.required]],
        img:[data.img,[Validators.required]],
        domicilio:[data.domicilio,[Validators.required]],
        nacionalidad:[data.nacionalidad,[Validators.required]],
        nacimiento:[data.nacimiento,[Validators.required]],

      })
    }, err =>{
      Swal.fire({
        title: 'error al modificar persona',
        icon:'error',
        showConfirmButton: false,
      })
      this.router.navigate(['']);
    });
    
  }

  get Nombre(){
    return this.form.get('nombre')
  }
  get Apellido(){
    return this.form.get('apellido')
  }
  get Img(){
    return this.form.get('img')
  }
  get Domicilio(){
    return this.form.get('domicilio')
  }
  get Nacionalidad(){
    return this.form.get('nacionalidad')
  }
  get Nacimiento(){
    return this.form.get('nacimiento')
  }

  onUpdate(event: Event): void{
    event.preventDefault()
    if(this.form.value.nombre && this.form.value.apellido && this.form.value.img && this.form.value.domicilio && this.form.value.nacionalidad && this.form.value.nacimiento){

      Swal.fire({
        title: 'Editando Persona',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
  
      const id = this.activatedRouter.snapshot.params['id'];
      
      if (this.imgService.url){
  
        this.persona.img = this.imgService.url
      }
     
      this.personaService.update( id, this.form.value ).subscribe( data => {
  
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
    }else{
      Swal.fire({
        title: 'Debe completar todos los campos',
        icon:'error',
        timer:1500,
        showConfirmButton: false,
      })
    }

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
