import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {
  fecha: string;
  title: string;
  info: string;

  constructor(private experienciaService: ExperienciaService,
    private router: Router,) { }

  ngOnInit(): void {
  }


  onCreate(){
    const experiencia = new Experiencia( this.fecha, this.title,this.info );

    Swal.fire({
      title: 'Creando Experiencia',
      text: 'Espere...',
      showConfirmButton: false,
    })

  
    this.experienciaService.save( experiencia ).subscribe( data => {
      
      Swal.fire({
        title: 'Experiencia creada correctamente',
        text: "Quieres agregar otra?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Agregar'
      }).then((result) => {
        if (!result.isConfirmed) {
          this.router.navigate(['']);
        }
      })

    }, err =>{
      
      Swal.fire({
   
        icon: 'error',
        title: 'error al agregar experiencia',
        showConfirmButton: false,
        timer: 2500
      })
      
      this.router.navigate(['']);
    });
  }

}
