import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  URL = environment.URL + 'contact/';

  constructor( private httpClient: HttpClient ) { }

  public lista(): Observable<Contact[]>{
    return this.httpClient.get<Contact[]>( this.URL + 'lista' );
  }

  public detail(id: number): Observable<Contact>{
    return this.httpClient.get<Contact>( this.URL + `detail/${id}` );
  }

  public save(contact: Contact): Observable<any>{
  
    return this.httpClient.post<any>(this.URL + `create`, contact);
  }

  public update(id:number, contact: Contact ): Observable<any>{
    return this.httpClient.put<any>(this.URL + `edit/${id}`, contact);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
