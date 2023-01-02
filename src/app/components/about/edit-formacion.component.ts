import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formacion } from 'src/app/model/formacion';
import { FormacionService } from 'src/app/services/formacion.service';

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
    const id = this.activatedRouter.snapshot.params['id'];

    this.formacionService.update( id, this.formacion ).subscribe( data => {
      
      this.router.navigate(['']);
    },err =>{
      
      alert("Error al modificar la formacion");
      this.router.navigate(['']);
    });

  }

}
