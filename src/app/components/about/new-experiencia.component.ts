import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

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

  
    this.experienciaService.save( experiencia ).subscribe( data => {
      
      alert("Experiencia creada correctamente");

      this.router.navigate(['']);
    }, err =>{
      alert("error al añadir experiencia");
      this.router.navigate(['']);
    });
  }

}
