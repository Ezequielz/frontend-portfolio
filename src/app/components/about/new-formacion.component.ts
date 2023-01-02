import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formacion } from 'src/app/model/formacion';
import { FormacionService } from '../../services/formacion.service';

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

  
    this.formacionService.save( formacion ).subscribe( data => {
      
      alert("Formacion creada correctamente");

      this.router.navigate(['']);
    }, err =>{
      alert("error al añadir formacion");
      this.router.navigate(['']);
    });
  }

}
