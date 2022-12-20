import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Contact = null;

  constructor(private contactService: ContactService,
     private router: Router,
     public imgService: ImageService
      ) { }


  ngOnInit(): void {

    this.imgService.cleanUrl();

    this.contactService.detail(1).subscribe( data => {
      this.contact = data;
  
    }, err =>{
      alert("Error al modificar el contacto");
      this.router.navigate(['']);
    });

  }

  onUpdate(){

    if(this.imgService.url){

      this.contact.cv = this.imgService.url
    }

    this.contactService.update( 1, this.contact ).subscribe( data => {
      this.router.navigate(['']);
    },err =>{
      alert("Error al modificar contacto");
      this.router.navigate(['']);
    });
    
  }

  uploadImage($event: any){

    const name = "contact_" + 1
    this.imgService.uploadImage( $event, name );

  }

}
