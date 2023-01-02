import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Formacion } from '../model/formacion';

@Injectable({
  providedIn: 'root'
})
export class FormacionService {

  URL = environment.URL + 'formacion/';

  constructor( private httpClient: HttpClient ) { }

public lista(): Observable<Formacion[]>{
  return this.httpClient.get<Formacion[]>(this.URL + 'lista');
}

public detail(id: number): Observable<Formacion>{
  return this.httpClient.get<Formacion>(this.URL + `detail/${ id }`);
}

public save(formacion: Formacion): Observable<any>{
  return this.httpClient.post<any>(this.URL + `create`, formacion);
}

public update(id:number, formacion: Formacion ): Observable<any>{
  return this.httpClient.put<any>(this.URL + `edit/${id}`, formacion);
}

public delete(id: number): Observable<any>{
  return this.httpClient.delete<any>(this.URL + `delete/${id}`);
}
}
