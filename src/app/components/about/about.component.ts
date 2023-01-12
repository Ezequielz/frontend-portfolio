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
import Swal from 'sweetalert2';




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
                
                title: 'Borrando formacion',
                text: 'Espere...',
                showConfirmButton: false
              })
              this.formacionService.delete(id).subscribe( data => {
                Swal.fire({
                  icon: 'success',
                  title: 'Formacion Borrada',
                  timer: 1500,
                  showConfirmButton: false
                })
                this.loadFormacion();
              }, err => {
                Swal.fire({
   
                  icon: 'error',
                  title: 'no se pudo borrar la formacion',
                  showConfirmButton: false,
                  timer: 2500
                })
              });

            }
          })
    }
  }
  deleteExperiencia( id: number ) {
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
            
            title: 'Borrando experiencia',
            text: 'Espere...',
            showConfirmButton: false
          })
          this.experienciaService.delete(id).subscribe( data => {
            Swal.fire({
              icon: 'success',
              title: 'Experiencia Borrada',
              timer: 1500,
              showConfirmButton: false
            })
            this.loadExp();
          }, err => {

            Swal.fire({
   
              icon: 'error',
              title: 'no se pudo borrar la experiencia',
              showConfirmButton: false,
              timer: 2500
            })
          
          });

        }
      })



    }
  }
  
 
}
