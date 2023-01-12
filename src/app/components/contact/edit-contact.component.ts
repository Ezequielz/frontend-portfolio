import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Contact = null;
  savePDF: boolean = false;

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

    Swal.fire({
      title: 'Editando Contacto',
      text: 'Espere...',
      showConfirmButton: false,
    })

    if(this.imgService.url){

      this.contact.cv = this.imgService.url
    }

    this.contactService.update( 1, this.contact ).subscribe( data => {
      Swal.fire({
        icon: 'success',
        title: 'Contacto Editado',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['']);
    },err =>{
      Swal.fire({
        icon: 'error',
        title: 'Error al modificar contacto',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['']);
    });
    
  }

  uploadImage($event: any){
    this.savePDF = true
    const name = "contact_" + 1
    this.imgService.uploadImage( $event, name ).then(r =>{

      this.savePDF = false
    });

  }

}
