import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProjects } from '../interfaces/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  productos: IProjects[] = []
  cargando = true


  constructor( private http: HttpClient ) {

    this.http.get('assets/data/data.json')
        .subscribe( (resp : any) => {
          this.productos = resp
          this.cargando = false
        });
  }


}
