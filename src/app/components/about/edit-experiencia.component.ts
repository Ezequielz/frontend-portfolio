import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaService } from 'src/app/services/experiencia.service';

import { Experiencia } from '../../model/experiencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {

  experiencia : Experiencia = null;

  constructor(private experienciaService: ExperienciaService ,
    private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];

    this.experienciaService.detail(id).subscribe( data => {
      this.experiencia = data;
    }, err =>{
      alert("Error al modificar la experiencia");
      this.router.navigate(['']);
    });
  }

  onUpdate(){


    Swal.fire({
      title: 'Editando Experiencia',
      text: 'Espere...',
      showConfirmButton: false,
    })

    const id = this.activatedRouter.snapshot.params['id'];

    this.experienciaService.update( id, this.experiencia ).subscribe( data => {

      Swal.fire({
        icon: 'success',
        title: 'Experiencia Editada',
        timer: 1500,
        showConfirmButton: false
      })
      
      this.router.navigate(['']);
    },err =>{
      
      Swal.fire({
        icon: 'error',
        title: 'Error al modificar la experiencia',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['']);
    });

  }
}
