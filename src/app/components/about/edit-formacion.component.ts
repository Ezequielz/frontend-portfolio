import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formacion } from 'src/app/model/formacion';
import { FormacionService } from 'src/app/services/formacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-formacion',
  templateUrl: './edit-formacion.component.html',
  styleUrls: ['./edit-formacion.component.css']
})
export class EditFormacionComponent implements OnInit {

  formacion: Formacion = null;

  constructor(private formacionService: FormacionService ,
    private activatedRouter: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];

    this.formacionService.detail(id).subscribe( data => {
      this.formacion = data;
    }, err =>{
      alert("Error al modificar la formacion");
      this.router.navigate(['']);
    });
  }

  onUpdate(): void{


    Swal.fire({
      title: 'Editando Formacion',
      text: 'Espere...',
      showConfirmButton: false,
    })

    const id = this.activatedRouter.snapshot.params['id'];


    this.formacionService.update( id, this.formacion ).subscribe( data => {

      Swal.fire({
        icon: 'success',
        title: 'Formacion Editada',
        timer: 1500,
        showConfirmButton: false
      })
      
      this.router.navigate(['']);
    },err =>{

      Swal.fire({
        icon: 'error',
        title: 'Error al modificar la formacion',
        timer: 1500,
        showConfirmButton: false
      })
      

      this.router.navigate(['']);
    });

  }

}
