import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formacion } from 'src/app/model/formacion';
import { FormacionService } from '../../services/formacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-formacion',
  templateUrl: './new-formacion.component.html',
  styleUrls: ['./new-formacion.component.css']
})
export class NewFormacionComponent implements OnInit {
  fecha: string;
  title: string;
  subtitle: string;
  info: string;

  constructor(private formacionService: FormacionService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  onCreate(){
    const formacion = new Formacion( this.fecha, this.title, this.subtitle,this.info );

     
    Swal.fire({
      title: 'Creando Formacion',
      text: 'Espere...',
      showConfirmButton: false,
    })


  
    this.formacionService.save( formacion ).subscribe( data => {


      Swal.fire({
        title: 'Formacion creada correctamente',
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
        title: 'error al agregar formacion',
        showConfirmButton: false,
        timer: 2500
      })

      this.router.navigate(['']);
    });
  }

}
